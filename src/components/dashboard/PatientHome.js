import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Calendar, Activity, PieChart, Clipboard, Thermometer } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from 'recharts';
import { Card, CardHeader, CardContent } from '../ui/card';
import Button from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import './PatientHome.css';

const mockHealthData = [
  { date: '2024-09-01', steps: 5000, calories: 2000 },
  { date: '2024-09-02', steps: 7500, calories: 2200 },
  { date: '2024-09-03', steps: 10000, calories: 2400 },
];

const mockMedications = [
  { name: 'Aspirin', dosage: '81mg', frequency: 'Daily' },
  { name: 'Metformin', dosage: '500mg', frequency: 'With meals' },
];

const PatientHome = () => {
  const [medicalTip, setMedicalTip] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [healthData, setHealthData] = useState(mockHealthData);
  const [medications, setMedications] = useState(mockMedications);
  const [vitalSigns, setVitalSigns] = useState({
    bloodPressure: '120/80',
    heartRate: '72',
    temperature: '98.6',
    oxygenSaturation: '98%',
  });

  useEffect(() => {
    setMedicalTip('Stay hydrated and exercise regularly!');
    setNotifications([
      { id: 1, message: 'New lab results available' },
      { id: 2, message: 'Health screening reminder' },
    ]);
    setUpcomingAppointments([
      { id: 1, date: '2024-09-15', doctor: 'Dr. Johnson', specialty: 'Cardiology' },
    ]);
  }, []);

  const goalData = [
    { name: 'Completed', value: 8000 },
    { name: 'Remaining', value: 2000 },
  ];

  const COLORS = ['#4CAF50', '#009688'];

  return (
    <div className="patient-dashboard">
      <Alert className="medical-tip">
        <AlertDescription>{medicalTip}</AlertDescription>
      </Alert>

      <div className="dashboard-grid">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <h2>Notifications</h2>
            <Bell />
          </CardHeader>
          <CardContent>
            <ul>
              {notifications.map((notification) => (
                <li key={notification.id}>{notification.message}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <h2>Upcoming Appointments</h2>
            <Calendar />
          </CardHeader>
          <CardContent>
            <ul>
              {upcomingAppointments.map((appointment) => (
                <li key={appointment.id}>
                  <span>{appointment.doctor} ({appointment.specialty})</span>
                  <span>{appointment.date}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Health Activity */}
        <Card>
          <CardHeader>
            <h2>Health Activity</h2>
            <Activity />
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={healthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="steps" stroke="#004C54" />
                <Line type="monotone" dataKey="calories" stroke="#FF7043" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Health Goals */}
        <Card>
          <CardHeader>
            <h2>Health Goals</h2>
            <PieChart />
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={100}>
              <RePieChart>
                <Pie data={goalData} innerRadius={30} outerRadius={50} paddingAngle={5} dataKey="value">
                  {goalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </RePieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Medications */}
        <Card>
          <CardHeader>
            <h2>Medications</h2>
            <Clipboard />
          </CardHeader>
          <CardContent>
            <ul>
              {medications.map((med, index) => (
                <li key={index}>
                  <span>{med.name}</span>
                  <span>{med.dosage} - {med.frequency}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Vital Signs */}
        <Card>
          <CardHeader>
            <h2>Vital Signs</h2>
            <Thermometer />
          </CardHeader>
          <CardContent>
            <ul>
              <li>
                <span>Blood Pressure:</span>
                <span>{vitalSigns.bloodPressure}</span>
              </li>
              <li>
                <span>Heart Rate:</span>
                <span>{vitalSigns.heartRate}</span>
              </li>
              <li>
                <span>Temperature:</span>
                <span>{vitalSigns.temperature}°F</span>
              </li>
              <li>
                <span>Oxygen Saturation:</span>
                <span>{vitalSigns.oxygenSaturation}</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientHome;
