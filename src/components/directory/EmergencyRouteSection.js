import React, { useState } from 'react';
import './EmergencyRouteSection.css';
import { contacts } from './EmergencyContacts';

const EmergencyRouteSection = ({ fetchEmergencyRoute, emergencyRoute }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [contactsPerPage, setContactsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1); // 1-indexed for manual pagination

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic: calculate the total number of pages
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);
  const displayedContacts = filteredContacts.slice(
    (currentPage - 1) * contactsPerPage,
    currentPage * contactsPerPage
  );

  const handleFetchRoute = async () => {
    setLoading(true);
    setError(null);
    try {
      await fetchEmergencyRoute();
    } catch (err) {
      setError('Failed to fetch the emergency route. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section className="emergency-route-section">
      <h2>Emergency Route</h2>
      <button onClick={handleFetchRoute} disabled={loading}>
        {loading ? 'Fetching Route...' : 'Get Nearest Emergency Route'}
      </button>
      {error && <p className="error-message">{error}</p>}

      {emergencyRoute && (
        <div className="route-details">
          <h3>{emergencyRoute.routeName}</h3>
          <p><strong>Path:</strong> {emergencyRoute.path.map(point => `(${point.lat}, ${point.lng})`).join(' > ')}</p>
          <p><strong>Estimated Time:</strong> {emergencyRoute.estimatedTime}</p>
          <p><strong>Distance:</strong> {emergencyRoute.distance}</p>
        </div>
      )}

      <div className="emergency-contacts">
        <h2>Emergency Contacts</h2>
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="contacts-pagination-controls">
          <label htmlFor="contactsPerPage">Show per page:</label>
          <select
            id="contactsPerPage"
            value={contactsPerPage}
            onChange={(e) => setContactsPerPage(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <ul>
          {displayedContacts.map((contact, index) => (
            <li key={index}>
              <h3>{contact.name}</h3>
              <p>{contact.address}</p>
              <p>{contact.contact.join('; ')}</p>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <div className="pagination">
          <button 
            onClick={handlePrevPage} 
            disabled={currentPage === 1}
            className="pagination-button"
          >
            &laquo;
          </button>
          {[...Array(totalPages).keys()].slice(0, 5).map(number => (
            <button 
              key={number + 1}
              onClick={() => handlePageChange(number + 1)}
              className={`pagination-button ${currentPage === number + 1 ? 'active' : ''}`}
            >
              {number + 1}
            </button>
          ))}
          <button 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            &raquo;
          </button>
        </div>
      </div>
    </section>
  );
};

export default EmergencyRouteSection;
