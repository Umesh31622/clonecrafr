
// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Card, Table, Badge, Spinner } from 'react-bootstrap';
// import { FaUsers, FaVideo, FaChartLine, FaDollarSign } from 'react-icons/fa';
// import axios from 'axios';
// import {
//   LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
// } from 'recharts';

// const Dashboard = () => {
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState([]);
//   const [recentTemplates, setRecentTemplates] = useState([]);
//   const [analyticsData, setAnalyticsData] = useState([]);

//   const fetchDashboard = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("https://clonecraftbackend-gydw.vercel.app/api/dashboard", {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (res.data.success) {
//         const s = res.data.data.stats;

//         // Stat cards
//         setStats([
//           { title: 'Total Users', value: s.totalUsers, icon: <FaUsers />, color: 'primary' },
//           { title: 'Templates', value: s.totalTemplates, icon: <FaVideo />, color: 'success' },
//           { title: 'Subscriptions', value: s.totalSubscriptions || 0, icon: <FaDollarSign />, color: 'info' },
//           { title: 'Analytics', value: s.totalAnalytics || 0, icon: <FaChartLine />, color: 'warning' }
//         ]);

//         // Recent templates
//         setRecentTemplates(res.data.data.recentTemplates || []);

//         // Analytics chart data (example)
//         setAnalyticsData(res.data.data.analytics || [
//           { day: 'Mon', users: 20 },
//           { day: 'Tue', users: 45 },
//           { day: 'Wed', users: 30 },
//           { day: 'Thu', users: 50 },
//           { day: 'Fri', users: 70 },
//           { day: 'Sat', users: 60 },
//           { day: 'Sun', users: 80 }
//         ]);
//       }
//     } catch (err) {
//       console.error("Dashboard fetch error:", err);
//       alert("Failed to load dashboard");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

//   return (
//     <Container fluid className="py-4">
//       <h2 className="mb-4">Dashboard</h2>

//       {/* Stats Cards */}
//       <Row className="mb-4">
//         {stats.map((stat, index) => (
//           <Col xl={3} lg={6} key={index} className="mb-3">
//             <Card className="h-100 shadow-sm border-0">
//               <Card.Body className="d-flex align-items-center">
//                 <div className={`stat-icon bg-${stat.color} bg-opacity-10 text-${stat.color} rounded-circle d-flex justify-content-center align-items-center`} style={{ width: 50, height: 50 }}>
//                   {stat.icon}
//                 </div>
//                 <div className="ms-3">
//                   <h3 className="mb-0">{stat.value}</h3>
//                   <p className="text-muted mb-0">{stat.title}</p>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {/* Analytics Chart */}
//       <Row className="mb-4">
//         <Col xl={8} lg={12} className="mb-3">
//           <Card className="shadow-sm border-0 h-100">
//             <Card.Header>
//               <h5 className="mb-0">User Analytics (Last 7 days)</h5>
//             </Card.Header>
//             <Card.Body>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={analyticsData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="day" />
//                   <YAxis />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="users" stroke="#0d6efd" strokeWidth={2} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </Card.Body>
//           </Card>
//         </Col>

//         {/* Recent Templates */}
//         <Col xl={4} lg={12} className="mb-3">
//           <Card className="shadow-sm border-0 h-100">
//             <Card.Header>
//               <h5 className="mb-0">Recent Templates</h5>
//             </Card.Header>
//             <Card.Body style={{ maxHeight: '300px', overflowY: 'auto' }}>
//               <Table hover responsive size="sm" className="mb-0">
//                 <thead>
//                   <tr>
//                     <th>Template</th>
//                     <th>Type</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {recentTemplates.map(t => (
//                     <tr key={t._id}>
//                       <td>{t.title}</td>
//                       <td>
//                         <Badge bg={t.type === 'video' ? 'primary' : 'success'}>
//                           {t.type}
//                         </Badge>
//                       </td>
//                     </tr>
//                   ))}
//                   {recentTemplates.length === 0 && (
//                     <tr><td colSpan={2} className="text-center text-muted">No recent templates</td></tr>
//                   )}
//                 </tbody>
//               </Table>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Badge, Spinner } from 'react-bootstrap';
import { FaUsers, FaVideo, FaChartLine, FaDownload } from 'react-icons/fa';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [recentTemplates, setRecentTemplates] = useState([]);
  const [downloadsData, setDownloadsData] = useState([]);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://clonecraftbackend-gydw.vercel.app/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        const s = res.data.data.stats;

        // Stat cards
        setStats([
          { title: 'Total Users', value: s.totalUsers, icon: <FaUsers />, color: 'primary' },
          { title: 'Templates', value: s.totalTemplates, icon: <FaVideo />, color: 'success' },
          { title: 'Total Downloads', value: s.totalDownloads || 0, icon: <FaDownload />, color: 'info' },
          { title: 'Analytics', value: s.totalAnalytics || 0, icon: <FaChartLine />, color: 'warning' }
        ]);

        // Recent templates
        setRecentTemplates(res.data.data.recentTemplates || []);

        // Downloads analytics chart (last 7 days)
        setDownloadsData(res.data.data.downloadsAnalytics || [
          { day: 'Mon', downloads: 20 },
          { day: 'Tue', downloads: 45 },
          { day: 'Wed', downloads: 30 },
          { day: 'Thu', downloads: 50 },
          { day: 'Fri', downloads: 70 },
          { day: 'Sat', downloads: 60 },
          { day: 'Sun', downloads: 80 }
        ]);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      alert("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4">Dashboard</h2>

      {/* Stats Cards */}
      <Row className="mb-4">
        {stats.map((stat, index) => (
          <Col xl={3} lg={6} key={index} className="mb-3">
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="d-flex align-items-center">
                <div className={`stat-icon bg-${stat.color} bg-opacity-10 text-${stat.color} rounded-circle d-flex justify-content-center align-items-center`} style={{ width: 50, height: 50 }}>
                  {stat.icon}
                </div>
                <div className="ms-3">
                  <h3 className="mb-0">{stat.value}</h3>
                  <p className="text-muted mb-0">{stat.title}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Downloads Analytics Chart */}
      <Row className="mb-4">
        <Col xl={8} lg={12} className="mb-3">
          <Card className="shadow-sm border-0 h-100">
            <Card.Header>
              <h5 className="mb-0">User Downloads (Last 7 days)</h5>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={downloadsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="downloads" stroke="#0d6efd" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Recent Templates */}
        <Col xl={4} lg={12} className="mb-3">
          <Card className="shadow-sm border-0 h-100">
            <Card.Header>
              <h5 className="mb-0">Recent Templates</h5>
            </Card.Header>
            <Card.Body style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <Table hover responsive size="sm" className="mb-0">
                <thead>
                  <tr>
                    <th>Template</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTemplates.map(t => (
                    <tr key={t._id}>
                      <td>{t.title}</td>
                      <td>
                        <Badge bg={t.type === 'video' ? 'primary' : 'success'}>
                          {t.type}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                  {recentTemplates.length === 0 && (
                    <tr><td colSpan={2} className="text-center text-muted">No recent templates</td></tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
