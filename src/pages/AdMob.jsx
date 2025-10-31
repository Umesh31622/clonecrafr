
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import "./AdMob.css";

// // const AdMobSettings = () => {
// //   const [androidSettings, setAndroidSettings] = useState({
// //     banner: false,
// //     interstitial: false,
// //     reward: false,
// //     bannerId: '',
// //     interstitialId: '',
// //     interstitialClick: '',
// //     rewardId: '',
// //     rewardClick: ''
// //   });

// //   const [iosSettings, setIosSettings] = useState({
// //     banner: false,
// //     interstitial: false,
// //     reward: false
// //   });

// //   const [ads, setAds] = useState([]);
// //   const [bannerAds, setBannerAds] = useState([]);
// //   const [interstitialAds, setInterstitialAds] = useState([]);
// //   const [rewardAds, setRewardAds] = useState([]);
// //   const [vendors, setVendors] = useState([]);
// //   const [videos, setVideos] = useState([]);
// //   const [selectedVendor, setSelectedVendor] = useState('');
// //   const [selectedVideoForAd, setSelectedVideoForAd] = useState('');
// //   const [showAddAdModal, setShowAddAdModal] = useState(false);
// //   const [showAddAdToVideoModal, setShowAddAdToVideoModal] = useState(false);
// //   const [selectedAd, setSelectedAd] = useState(null);
  
// //   const [newAd, setNewAd] = useState({
// //     name: '',
// //     type: 'banner',
// //     platform: 'admob',
// //     adUnitId: '',
// //     frequency: 1,
// //     isActive: true
// //   });

// //   const [adToVideoSettings, setAdToVideoSettings] = useState({
// //     placement: 'pre-roll',
// //     showAt: 0,
// //     isSkippable: true,
// //     skipAfter: 5
// //   });

// //   // Fetch initial data on component mount
// //   useEffect(() => {
// //     fetchAds();
// //     fetchVendors();
// //     fetchAdsByType();
// //   }, []);

// //   // Fetch videos when vendor is selected
// //   useEffect(() => {
// //     if (selectedVendor) {
// //       fetchVideosByVendor(selectedVendor);
// //     } else {
// //       setVideos([]);
// //       setSelectedVideoForAd('');
// //     }
// //   }, [selectedVendor]);

// //   const fetchAds = async () => {
// //     try {
// //       const response = await fetch('https://shreejighutargo21.onrender.com/api/admin/ads/all');
// //       const data = await response.json();
      
// //       console.log('Fetched ads:', data);
  
// //       if (Array.isArray(data.data?.ads)) {
// //         setAds(data.data.ads);
// //       } else {
// //         console.warn('Unexpected ads response format');
// //         setAds([]);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching ads:', error);
// //     }
// //   };

// //   const fetchAdsByType = async () => {
// //     try {
// //       const bannerResponse = await fetch('https://shreejighutargo21.onrender.com/api/admin/adType/banner');
// //       const bannerData = await bannerResponse.json();
  
// //       if (bannerData.success && Array.isArray(bannerData.data)) {
// //         setBannerAds(bannerData.data);
// //       } else {
// //         console.warn('No banner ads available');
// //         setBannerAds([]);
// //       }
  
// //       const interstitialResponse = await fetch('https://shreejighutargo21.onrender.com/api/admin/adType/interstitial');
// //       const interstitialData = await interstitialResponse.json();
  
// //       if (interstitialData.success && Array.isArray(interstitialData.data)) {
// //         setInterstitialAds(interstitialData.data);
// //       } else {
// //         console.warn('No interstitial ads available');
// //         setInterstitialAds([]);
// //       }
  
// //       const rewardResponse = await fetch('https://shreejighutargo21.onrender.com/api/admin/adType/reward');
// //       const rewardData = await rewardResponse.json();
  
// //       if (rewardData.success && Array.isArray(rewardData.data)) {
// //         setRewardAds(rewardData.data);
// //       } else {
// //         console.warn('No reward ads available');
// //         setRewardAds([]);
// //       }
  
// //     } catch (error) {
// //       console.error('Error fetching ads by type:', error);
// //     }
// //   };

// //   const fetchVendors = async () => {
// //     try {
// //       const response = await fetch('https://shreejighutargo21.onrender.com/api/admin/all-vendors');
// //       const data = await response.json();
      
// //       console.log('Fetched vendors:', data);
      
// //       if (data.success && Array.isArray(data.vendors)) {
// //         setVendors(data.vendors);
// //       } else {
// //         console.warn('Unexpected vendors response format');
// //         setVendors([]);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching vendors:', error);
// //     }
// //   };

// //   const fetchVideosByVendor = async (vendorId) => {
// //     try {
// //       const response = await fetch(`https://shreejighutargo21.onrender.com/api/admin/videos/${vendorId}`);
// //       const data = await response.json();
      
// //       console.log('Fetched videos:', data);
      
// //       if (data.success && Array.isArray(data.videos)) {
// //         setVideos(data.videos);
// //       } else {
// //         console.warn('Unexpected videos response format');
// //         setVideos([]);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching videos:', error);
// //     }
// //   };

// //   const handleToggle = (platform, type, value) => {
// //     if (platform === 'android') {
// //       setAndroidSettings({ ...androidSettings, [type]: value });
// //     } else {
// //       setIosSettings({ ...iosSettings, [type]: value });
// //     }
// //   };

// //   const handleInputChange = (e, field) => {
// //     setAndroidSettings(prev => ({ ...prev, [field]: e.target.value }));
// //   };

// //   const handleAdSelection = (adId, field) => {
// //     let selectedAd;
    
// //     if (field === 'bannerId') {
// //       selectedAd = bannerAds.find(ad => ad._id === adId);
// //     } else if (field === 'interstitialId') {
// //       selectedAd = interstitialAds.find(ad => ad._id === adId);
// //     } else if (field === 'rewardId') {
// //       selectedAd = rewardAds.find(ad => ad._id === adId);
// //     }
    
// //     if (selectedAd) {
// //       setAndroidSettings(prev => ({ ...prev, [field]: selectedAd.adUnitId }));
// //     }
// //   };

// //   const handleCreateAd = async () => {
// //     try {
// //       const response = await fetch('https://shreejighutargo21.onrender.com/api/admin/create-ads', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           title: newAd.name,
// //           adType: newAd.type,
// //           platform: newAd.platform,
// //           adUnitId: newAd.adUnitId,
// //           frequency: newAd.frequency,
// //           isActive: newAd.isActive
// //         }),
// //       });
  
// //       if (response.ok) {
// //         fetchAds();
// //         fetchAdsByType();
// //         setShowAddAdModal(false);
// //         setNewAd({
// //           name: '',
// //           type: 'banner',
// //           platform: 'admob',
// //           adUnitId: '',
// //           frequency: 1,
// //           isActive: true
// //         });
// //         alert('Ad created successfully!');
// //       } else {
// //         const errorData = await response.json();
// //         throw new Error(errorData.message || 'Failed to create ad');
// //       }
// //     } catch (error) {
// //       console.error('Error creating ad:', error);
// //       alert('Failed to create ad: ' + error.message);
// //     }
// //   };

// //   const handleAddAdToVideo = async () => {
// //     if (!selectedVideoForAd || !selectedAd) {
// //       alert('Please select both a video and an ad');
// //       return;
// //     }
  
// //     try {
// //       const payload = {
// //         videoId: selectedVideoForAd,
// //         adId: selectedAd._id,
// //         placement: adToVideoSettings.placement,
// //         showAt: adToVideoSettings.showAt,
// //         isSkippable: adToVideoSettings.isSkippable,
// //         skipAfter: adToVideoSettings.skipAfter
// //       };

// //       console.log('Adding ad to video with payload:', payload);

// //       const response = await fetch('https://shreejighutargo21.onrender.com/api/admin/video/add-ad', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(payload),
// //       });
      
// //       if (response.ok) {
// //         alert('Ad added to video successfully!');
// //         setShowAddAdToVideoModal(false);
// //         setSelectedAd(null);
// //         setAdToVideoSettings({
// //           placement: 'pre-roll',
// //           showAt: 0,
// //           isSkippable: true,
// //           skipAfter: 5
// //         });
// //       } else {
// //         const errorData = await response.json();
// //         throw new Error(errorData.message || 'Failed to add ad to video');
// //       }
// //     } catch (error) {
// //       console.error('Error adding ad to video:', error);
// //       alert('Failed to add ad to video: ' + error.message);
// //     }
// //   };

// //   const openAddAdToVideoModal = (ad) => {
// //     if (!selectedVideoForAd) {
// //       alert('Please select a video first');
// //       return;
// //     }
// //     setSelectedAd(ad);
// //     setShowAddAdToVideoModal(true);
// //   };

// //   const handleSave = async () => {
// //     try {
// //       const adsToSave = [];

// //       if (androidSettings.banner && androidSettings.bannerId) {
// //         adsToSave.push({
// //           name: 'Android Banner',
// //           type: 'banner',
// //           platform: 'admob',
// //           adUnitId: androidSettings.bannerId,
// //         });
// //       }

// //       if (androidSettings.interstitial && androidSettings.interstitialId) {
// //         adsToSave.push({
// //           name: 'Android Interstitial',
// //           type: 'interstitial',
// //           platform: 'admob',
// //           adUnitId: androidSettings.interstitialId,
// //           frequency: androidSettings.interstitialClick ? parseInt(androidSettings.interstitialClick) : 1
// //         });
// //       }

// //       if (androidSettings.reward && androidSettings.rewardId) {
// //         adsToSave.push({
// //           name: 'Android Reward',
// //           type: 'rewarded',
// //           platform: 'admob',
// //           adUnitId: androidSettings.rewardId,
// //           frequency: androidSettings.rewardClick ? parseInt(androidSettings.rewardClick) : 1
// //         });
// //       }

// //       for (let ad of adsToSave) {
// //         await axios.post('https://shreejighutargo21.onrender.com/api/admin/create-ads', ad);
// //       }

// //       fetchAds();
// //       fetchAdsByType();
// //       alert('Ad settings saved successfully!');
// //     } catch (error) {
// //       console.error('Error saving ad settings:', error);
// //       alert('Failed to save ad settings.');
// //     }
// //   };

// //   return (
// //     <div className="admob-container">
// //       {/* Header with Add Ad Button */}
// //       <div className="admob-header">
// //         <div className="header-title">
// //           <h2>AdMob Settings</h2>
// //           <div className="breadcrumb">Dashboard / AdMob Settings</div>
// //         </div>
// //         <button
// //           onClick={() => setShowAddAdModal(true)}
// //           className="btn btn-primary add-ad-btn"
// //         >
// //           + Add New Ad
// //         </button>
// //       </div>

// //       {/* Vendor Selection */}
// //       <div className="selection-card">
// //         <h4>Select Vendor</h4>
// //         <select
// //           value={selectedVendor}
// //           onChange={(e) => setSelectedVendor(e.target.value)}
// //           className="form-select"
// //         >
// //           <option value="">Select a vendor</option>
// //           {vendors.map(vendor => (
// //             <option key={vendor._id} value={vendor._id}>
// //               {vendor.name || vendor.vendorName || `Vendor ${vendor._id}`}
// //             </option>
// //           ))}
// //         </select>
// //       </div>

// //       {/* Video Selection for Ad Management */}
// //       <div className="selection-card">
// //         <h4>Video-Ad Management</h4>
// //         <select
// //           value={selectedVideoForAd}
// //           onChange={(e) => setSelectedVideoForAd(e.target.value)}
// //           disabled={!selectedVendor}
// //           className={`form-select ${!selectedVendor ? 'disabled' : ''}`}
// //         >
// //           <option value="">
// //             {!selectedVendor ? 'Select a vendor first' : 'Select a video to manage ads'}
// //           </option>
// //           {videos.map(video => (
// //             <option key={video._id} value={video._id}>
// //               {video.title || video.name || `Video ${video._id}`}
// //             </option>
// //           ))}
// //         </select>
// //         {selectedVendor && videos.length === 0 && (
// //           <div className="no-videos-message">
// //             No videos found for this vendor.
// //           </div>
// //         )}
// //       </div>

// //       {/* Ad Selection and Assignment */}
// //       {selectedVideoForAd && (
// //         <div className="selection-card">
// //           <h4>Select Ad to Assign</h4>
// //           <select
// //             value={selectedAd?._id || ''}
// //             onChange={(e) => {
// //               const ad = ads.find(ad => ad._id === e.target.value);
// //               setSelectedAd(ad || null);
// //             }}
// //             className="form-select"
// //           >
// //             <option value="">Select an ad to assign</option>
// //             {ads.map(ad => (
// //               <option key={ad._id} value={ad._id}>
// //                 {ad.name || ad.title} ({ad.adType})
// //               </option>
// //             ))}
// //           </select>

// //           {/* Placement Options */}
// //           <div className="form-group">
// //             <label>Placement</label>
// //             <select
// //               value={adToVideoSettings.placement}
// //               onChange={(e) => setAdToVideoSettings(prev => ({ ...prev, placement: e.target.value }))}
// //               className="form-select"
// //             >
// //               <option value="pre-roll">Pre-roll</option>
// //               <option value="mid-roll">Mid-roll</option>
// //               <option value="post-roll">Post-roll</option>
// //             </select>
// //           </div>

// //           {/* Show At */}
// //           <div className="form-group">
// //             <label>Show At (in seconds)</label>
// //             <input
// //               type="number"
// //               value={adToVideoSettings.showAt}
// //               onChange={(e) =>
// //                 setAdToVideoSettings(prev => ({
// //                   ...prev,
// //                   showAt: parseInt(e.target.value) || 0
// //                 }))
// //               }
// //               className="form-input"
// //             />
// //           </div>

// //           {/* Skip options */}
// //           <div className="form-group">
// //             <label className="checkbox-label">
// //               <input
// //                 type="checkbox"
// //                 checked={adToVideoSettings.isSkippable}
// //                 onChange={(e) =>
// //                   setAdToVideoSettings(prev => ({
// //                     ...prev,
// //                     isSkippable: e.target.checked
// //                   }))
// //                 }
// //                 className="checkbox"
// //               />
// //               Skippable
// //             </label>
// //           </div>

// //           {adToVideoSettings.isSkippable && (
// //             <div className="form-group">
// //               <label>Skip After (in seconds)</label>
// //               <input
// //                 type="number"
// //                 value={adToVideoSettings.skipAfter}
// //                 onChange={(e) =>
// //                   setAdToVideoSettings(prev => ({
// //                     ...prev,
// //                     skipAfter: parseInt(e.target.value) || 3
// //                   }))
// //                 }
// //                 className="form-input"
// //               />
// //             </div>
// //           )}

// //           {/* Assign Button */}
// //           <button
// //             onClick={handleAddAdToVideo}
// //             className="btn btn-primary assign-btn"
// //           >
// //             Assign Ad to Video
// //           </button>
// //         </div>
// //       )}

// //       {/* Display All Ads */}
// //       <div className="ads-table-container">
// //         <h3>All Ads</h3>
// //         {ads.length === 0 ? (
// //           <p className="no-ads-message">No ads available.</p>
// //         ) : (
// //           <div className="table-responsive">
// //             <table className="ads-table">
// //               <thead>
// //                 <tr>
// //                   <th>Title</th>
// //                   <th>Type</th>
// //                   <th>Placement</th>
// //                   <th>Platform</th>
// //                   <th>Ad Unit ID</th>
// //                   <th>Created At</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {ads.map(ad => (
// //                   <tr key={ad._id}>
// //                     <td data-label="Title">{ad.title || '-'}</td>
// //                     <td data-label="Type">{ad.adType || '-'}</td>
// //                     <td data-label="Placement">{ad.placement || '-'}</td>
// //                     <td data-label="Platform">{ad.platform || 'admob'}</td>
// //                     <td data-label="Ad Unit ID">{ad.adUnitId || '-'}</td>
// //                     <td data-label="Created At">{new Date(ad.createdAt).toLocaleString()}</td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}
// //       </div>

// //       {/* Main Settings Card */}
// //       <div className="settings-card">
// //         <h3>AdMob Android Settings</h3>
        
// //         <div className="settings-grid">
// //           {/* Banner Ad Section */}
// //           <div className="ad-section">
// //             <label className="section-label">Banner Ad</label>
// //             <div className="toggle-buttons">
// //               <button
// //                 onClick={() => handleToggle('android', 'banner', false)}
// //                 className={`btn toggle-btn ${!androidSettings.banner ? 'active' : ''}`}
// //               >
// //                 No
// //               </button>
// //               <button
// //                 onClick={() => handleToggle('android', 'banner', true)}
// //                 className={`btn toggle-btn ${androidSettings.banner ? 'active' : ''}`}
// //               >
// //                 Yes
// //               </button>
// //             </div>
            
// //             <div className="input-group">
// //               <select
// //                 onChange={(e) => handleAdSelection(e.target.value, 'bannerId')}
// //                 className="form-select"
// //               >
// //                 <option value="">Select existing banner ad or enter manually</option>
// //                 {bannerAds.length > 0 ? (
// //                   bannerAds.map(ad => (
// //                     <option key={ad._id} value={ad._id}>
// //                       {ad.title || ad.name} - {ad.adUnitId}
// //                     </option>
// //                   ))
// //                 ) : (
// //                   <option disabled>No banner ads available</option>
// //                 )}
// //               </select>
// //               <span className="separator">OR</span>
// //               <input
// //                 placeholder="Enter Ad Unit ID manually"
// //                 value={androidSettings.bannerId}
// //                 onChange={(e) => handleInputChange(e, 'bannerId')}
// //                 className="form-input"
// //               />
// //             </div>
// //           </div>

// //           {/* Interstitial Ad Section */}
// //           <div className="ad-section">
// //             <label className="section-label">Interstitial Ad</label>
// //             <div className="toggle-buttons">
// //               <button
// //                 onClick={() => handleToggle('android', 'interstitial', false)}
// //                 className={`btn toggle-btn ${!androidSettings.interstitial ? 'active' : ''}`}
// //               >
// //                 No
// //               </button>
// //               <button
// //                 onClick={() => handleToggle('android', 'interstitial', true)}
// //                 className={`btn toggle-btn ${androidSettings.interstitial ? 'active' : ''}`}
// //               >
// //                 Yes
// //               </button>
// //             </div>
            
// //             <div className="input-group">
// //               <select
// //                 onChange={(e) => handleAdSelection(e.target.value, 'interstitialId')}
// //                 className="form-select"
// //               >
// //                 <option value="">Select existing interstitial ad or enter manually</option>
                
// //                 {interstitialAds.length > 0 ? (
// //                   interstitialAds.map(ad => (
// //                     <option key={ad._id} value={ad._id}>
// //                       {ad.title || ad.name} - {ad.adUnitId}
// //                     </option>
// //                   ))
// //                 ) : (
// //                   <option disabled>No interstitial ads available</option>
// //                 )}
// //               </select>
// //               <span className="separator">OR</span>
// //               <input
// //                 placeholder="Enter Ad Unit ID manually"
// //                 value={androidSettings.interstitialId}
// //                 onChange={(e) => handleInputChange(e, 'interstitialId')}
// //                 className="form-input"
// //               />
// //             </div>
            
// //             <div className="frequency-input">
// //               <input
// //                 placeholder="Click frequency"
// //                 value={androidSettings.interstitialClick}
// //                 onChange={(e) => handleInputChange(e, 'interstitialClick')}
// //                 className="form-input"
// //                 type="number"
// //               />
// //             </div>
// //           </div>

// //           {/* Reward Ad Section */}
// //           <div className="ad-section">
// //             <label className="section-label">Reward Ad</label>
// //             <div className="toggle-buttons">
// //               <button
// //                 onClick={() => handleToggle('android', 'reward', false)}
// //                 className={`btn toggle-btn ${!androidSettings.reward ? 'active' : ''}`}
// //               >
// //                 No
// //               </button>
// //               <button
// //                 onClick={() => handleToggle('android', 'reward', true)}
// //                 className={`btn toggle-btn ${androidSettings.reward ? 'active' : ''}`}
// //               >
// //                 Yes
// //               </button>
// //             </div>
            
// //             <div className="input-group">
// //               <select
// //                 onChange={(e) => handleAdSelection(e.target.value, 'rewardId')}
// //                 className="form-select"
// //               >
// //                 <option value="">Select existing reward ad or enter manually</option>
// //                 {rewardAds.length > 0 ? (
// //                   rewardAds.map(ad => (
// //                     <option key={ad._id} value={ad._id}>
// //                       {ad.title || ad.name} - {ad.adUnitId}
// //                     </option>
// //                   ))
// //                 ) : (
// //                   <option disabled>No reward ads available</option>
// //                 )}
// //               </select>
// //               <span className="separator">OR</span>
// //               <input
// //                 placeholder="Enter Ad Unit ID manually"
// //                 value={androidSettings.rewardId}
// //                 onChange={(e) => handleInputChange(e, 'rewardId')}
// //                 className="form-input"
// //               />
// //             </div>
            
// //             <div className="frequency-input">
// //               <input
// //                 placeholder="Click frequency"
// //                 value={androidSettings.rewardClick}
// //                 onChange={(e) => handleInputChange(e, 'rewardClick')}
// //                 className="form-input"
// //                 type="number"
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Save Button */}
// //         <div className="save-section">
// //           <button
// //             onClick={handleSave}
// //             className="btn btn-success save-btn"
// //           >
// //             Save Settings
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdMobSettings;
// import React, { useState } from 'react';
// import { Settings, Plus, Edit2, Trash2, Video, Image, Gift } from 'lucide-react';
// import './AdMob.css';

// const AdMobSettings = () => {
//   const [activeTab, setActiveTab] = useState('android');
//   const [showAddAdModal, setShowAddAdModal] = useState(false);
  
//   // Android Settings
//   const [androidSettings, setAndroidSettings] = useState({
//     banner: {
//       enabled: false,
//       adUnitId: '',
//       position: 'bottom'
//     },
//     interstitial: {
//       enabled: false,
//       adUnitId: '',
//       frequency: 3,
//       showOnScreens: ['home', 'category']
//     },
//     rewarded: {
//       enabled: false,
//       adUnitId: '',
//       rewardAmount: 10,
//       showAfter: 'download'
//     }
//   });

//   // iOS Settings
//   const [iosSettings, setIosSettings] = useState({
//     banner: {
//       enabled: false,
//       adUnitId: '',
//       position: 'bottom'
//     },
//     interstitial: {
//       enabled: false,
//       adUnitId: '',
//       frequency: 3,
//       showOnScreens: ['home', 'category']
//     },
//     rewarded: {
//       enabled: false,
//       adUnitId: '',
//       rewardAmount: 10,
//       showAfter: 'download'
//     }
//   });

//   // Existing Ads List
//   const [adsList, setAdsList] = useState([
//     {
//       id: 1,
//       name: 'Home Banner',
//       type: 'banner',
//       platform: 'Android',
//       adUnitId: 'ca-app-pub-3940256099942544/6300978111',
//       status: 'active',
//       impressions: 12500,
//       clicks: 450
//     },
//     {
//       id: 2,
//       name: 'Video Interstitial',
//       type: 'interstitial',
//       platform: 'Android',
//       adUnitId: 'ca-app-pub-3940256099942544/1033173712',
//       status: 'active',
//       impressions: 8200,
//       clicks: 320
//     },
//     {
//       id: 3,
//       name: 'Reward Ad',
//       type: 'rewarded',
//       platform: 'iOS',
//       adUnitId: 'ca-app-pub-3940256099942544/5224354917',
//       status: 'active',
//       impressions: 5400,
//       clicks: 1200
//     }
//   ]);

//   // New Ad Form
//   const [newAd, setNewAd] = useState({
//     name: '',
//     type: 'banner',
//     platform: 'android',
//     adUnitId: ''
//   });

//   const handleToggle = (platform, adType) => {
//     if (platform === 'android') {
//       setAndroidSettings({
//         ...androidSettings,
//         [adType]: {
//           ...androidSettings[adType],
//           enabled: !androidSettings[adType].enabled
//         }
//       });
//     } else {
//       setIosSettings({
//         ...iosSettings,
//         [adType]: {
//           ...iosSettings[adType],
//           enabled: !iosSettings[adType].enabled
//         }
//       });
//     }
//   };

//   const handleInputChange = (platform, adType, field, value) => {
//     if (platform === 'android') {
//       setAndroidSettings({
//         ...androidSettings,
//         [adType]: {
//           ...androidSettings[adType],
//           [field]: value
//         }
//       });
//     } else {
//       setIosSettings({
//         ...iosSettings,
//         [adType]: {
//           ...iosSettings[adType],
//           [field]: value
//         }
//       });
//     }
//   };

//   const handleSaveSettings = () => {
//     console.log('Android Settings:', androidSettings);
//     console.log('iOS Settings:', iosSettings);
//     alert('Settings saved successfully!');
//   };

//   const handleCreateAd = () => {
//     if (!newAd.name || !newAd.adUnitId) {
//       alert('Please fill all required fields');
//       return;
//     }

//     const ad = {
//       id: adsList.length + 1,
//       name: newAd.name,
//       type: newAd.type,
//       platform: newAd.platform === 'android' ? 'Android' : 'iOS',
//       adUnitId: newAd.adUnitId,
//       status: 'active',
//       impressions: 0,
//       clicks: 0
//     };

//     setAdsList([...adsList, ad]);
//     setShowAddAdModal(false);
//     setNewAd({ name: '', type: 'banner', platform: 'android', adUnitId: '' });
//     alert('Ad created successfully!');
//   };

//   const handleDeleteAd = (id) => {
//     if (window.confirm('Are you sure you want to delete this ad?')) {
//       setAdsList(adsList.filter(ad => ad.id !== id));
//     }
//   };

//   const getAdIcon = (type) => {
//     switch(type) {
//       case 'banner': return <Image className="ad-icon" />;
//       case 'interstitial': return <Video className="ad-icon" />;
//       case 'rewarded': return <Gift className="ad-icon" />;
//       default: return <Settings className="ad-icon" />;
//     }
//   };

//   const currentSettings = activeTab === 'android' ? androidSettings : iosSettings;

//   return (
//     <div className="admob-page">
//       {/* Header */}
//       <div className="admob-header">
//         <div className="header-left">
//           <h1 className="page-title">
//             <Settings className="title-icon" />
//             AdMob Settings
//           </h1>
//           <p className="breadcrumb">Dashboard / AdMob Settings</p>
//         </div>
//         <button onClick={() => setShowAddAdModal(true)} className="btn-add-ad">
//           <Plus className="btn-icon" />
//           Add New Ad
//         </button>
//       </div>

//       {/* Platform Tabs */}
//       <div className="platform-tabs">
//         <button
//           onClick={() => setActiveTab('android')}
//           className={`tab-btn ${activeTab === 'android' ? 'active' : ''}`}
//         >
//           Android Settings
//         </button>
//         <button
//           onClick={() => setActiveTab('ios')}
//           className={`tab-btn ${activeTab === 'ios' ? 'active' : ''}`}
//         >
//           iOS Settings
//         </button>
//       </div>

//       {/* Settings Cards */}
//       <div className="settings-container">
//         {/* Banner Ad Settings */}
//         <div className="settings-card">
//           <div className="card-header">
//             <div className="card-title-section">
//               <div className="icon-wrapper banner">
//                 <Image className="card-icon" />
//               </div>
//               <div>
//                 <h3 className="card-title">Banner Ad</h3>
//                 <p className="card-subtitle">Display banner ads in your app</p>
//               </div>
//             </div>
//             <label className="toggle-switch">
//               <input
//                 type="checkbox"
//                 checked={currentSettings.banner.enabled}
//                 onChange={() => handleToggle(activeTab, 'banner')}
//               />
//               <span className="toggle-slider"></span>
//             </label>
//           </div>

//           {currentSettings.banner.enabled && (
//             <div className="card-content">
//               <div className="form-group">
//                 <label className="form-label">Ad Unit ID</label>
//                 <input
//                   type="text"
//                   value={currentSettings.banner.adUnitId}
//                   onChange={(e) => handleInputChange(activeTab, 'banner', 'adUnitId', e.target.value)}
//                   placeholder="ca-app-pub-3940256099942544/6300978111"
//                   className="form-input"
//                 />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Position</label>
//                 <select
//                   value={currentSettings.banner.position}
//                   onChange={(e) => handleInputChange(activeTab, 'banner', 'position', e.target.value)}
//                   className="form-select"
//                 >
//                   <option value="top">Top</option>
//                   <option value="bottom">Bottom</option>
//                 </select>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Interstitial Ad Settings */}
//         <div className="settings-card">
//           <div className="card-header">
//             <div className="card-title-section">
//               <div className="icon-wrapper interstitial">
//                 <Video className="card-icon" />
//               </div>
//               <div>
//                 <h3 className="card-title">Interstitial Ad</h3>
//                 <p className="card-subtitle">Full-screen ads between content</p>
//               </div>
//             </div>
//             <label className="toggle-switch">
//               <input
//                 type="checkbox"
//                 checked={currentSettings.interstitial.enabled}
//                 onChange={() => handleToggle(activeTab, 'interstitial')}
//               />
//               <span className="toggle-slider interstitial"></span>
//             </label>
//           </div>

//           {currentSettings.interstitial.enabled && (
//             <div className="card-content">
//               <div className="form-group">
//                 <label className="form-label">Ad Unit ID</label>
//                 <input
//                   type="text"
//                   value={currentSettings.interstitial.adUnitId}
//                   onChange={(e) => handleInputChange(activeTab, 'interstitial', 'adUnitId', e.target.value)}
//                   placeholder="ca-app-pub-3940256099942544/1033173712"
//                   className="form-input"
//                 />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Show After Every (clicks)</label>
//                 <input
//                   type="number"
//                   value={currentSettings.interstitial.frequency}
//                   onChange={(e) => handleInputChange(activeTab, 'interstitial', 'frequency', parseInt(e.target.value))}
//                   className="form-input"
//                 />
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Rewarded Ad Settings */}
//         <div className="settings-card">
//           <div className="card-header">
//             <div className="card-title-section">
//               <div className="icon-wrapper rewarded">
//                 <Gift className="card-icon" />
//               </div>
//               <div>
//                 <h3 className="card-title">Rewarded Ad</h3>
//                 <p className="card-subtitle">Reward users for watching ads</p>
//               </div>
//             </div>
//             <label className="toggle-switch">
//               <input
//                 type="checkbox"
//                 checked={currentSettings.rewarded.enabled}
//                 onChange={() => handleToggle(activeTab, 'rewarded')}
//               />
//               <span className="toggle-slider rewarded"></span>
//             </label>
//           </div>

//           {currentSettings.rewarded.enabled && (
//             <div className="card-content">
//               <div className="form-group">
//                 <label className="form-label">Ad Unit ID</label>
//                 <input
//                   type="text"
//                   value={currentSettings.rewarded.adUnitId}
//                   onChange={(e) => handleInputChange(activeTab, 'rewarded', 'adUnitId', e.target.value)}
//                   placeholder="ca-app-pub-3940256099942544/5224354917"
//                   className="form-input"
//                 />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Reward Amount (coins/points)</label>
//                 <input
//                   type="number"
//                   value={currentSettings.rewarded.rewardAmount}
//                   onChange={(e) => handleInputChange(activeTab, 'rewarded', 'rewardAmount', parseInt(e.target.value))}
//                   className="form-input"
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Save Button */}
//       <button onClick={handleSaveSettings} className="btn-save">
//         Save All Settings
//       </button>

//       {/* Existing Ads Table */}
//       <div className="ads-table-section">
//         <h3 className="section-title">All Ads</h3>
//         <div className="table-wrapper">
//           <table className="ads-table">
//             <thead>
//               <tr>
//                 <th>Ad Name</th>
//                 <th>Type</th>
//                 <th>Platform</th>
//                 <th>Ad Unit ID</th>
//                 <th>Status</th>
//                 <th>Impressions</th>
//                 <th>Clicks</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {adsList.map((ad) => (
//                 <tr key={ad.id}>
//                   <td>
//                     <div className="ad-name-cell">
//                       <div className={`icon-wrapper-small ${ad.type}`}>
//                         {getAdIcon(ad.type)}
//                       </div>
//                       <span>{ad.name}</span>
//                     </div>
//                   </td>
//                   <td className="capitalize">{ad.type}</td>
//                   <td>{ad.platform}</td>
//                   <td>
//                     <code className="ad-unit-code">{ad.adUnitId}</code>
//                   </td>
//                   <td>
//                     <span className={`status-badge ${ad.status}`}>
//                       {ad.status}
//                     </span>
//                   </td>
//                   <td>{ad.impressions.toLocaleString()}</td>
//                   <td>{ad.clicks.toLocaleString()}</td>
//                   <td>
//                     <div className="action-buttons">
//                       <button className="action-btn edit">
//                         <Edit2 className="action-icon" />
//                       </button>
//                       <button onClick={() => handleDeleteAd(ad.id)} className="action-btn delete">
//                         <Trash2 className="action-icon" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Add Ad Modal */}
//       {showAddAdModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h3 className="modal-title">Add New Ad</h3>
//               <button onClick={() => setShowAddAdModal(false)} className="modal-close">
//                 ×
//               </button>
//             </div>

//             <div className="modal-body">
//               <div className="form-group">
//                 <label className="form-label">Ad Name</label>
//                 <input
//                   type="text"
//                   value={newAd.name}
//                   onChange={(e) => setNewAd({ ...newAd, name: e.target.value })}
//                   placeholder="e.g., Home Banner Ad"
//                   className="form-input"
//                 />
//               </div>

//               <div className="form-group">
//                 <label className="form-label">Ad Type</label>
//                 <select
//                   value={newAd.type}
//                   onChange={(e) => setNewAd({ ...newAd, type: e.target.value })}
//                   className="form-select"
//                 >
//                   <option value="banner">Banner</option>
//                   <option value="interstitial">Interstitial</option>
//                   <option value="rewarded">Rewarded</option>
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label className="form-label">Platform</label>
//                 <select
//                   value={newAd.platform}
//                   onChange={(e) => setNewAd({ ...newAd, platform: e.target.value })}
//                   className="form-select"
//                 >
//                   <option value="android">Android</option>
//                   <option value="ios">iOS</option>
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label className="form-label">Ad Unit ID</label>
//                 <input
//                   type="text"
//                   value={newAd.adUnitId}
//                   onChange={(e) => setNewAd({ ...newAd, adUnitId: e.target.value })}
//                   placeholder="ca-app-pub-xxxxxxxxxxxxx/xxxxxxxxxx"
//                   className="form-input"
//                 />
//               </div>

//               <div className="modal-actions">
//                 <button onClick={() => setShowAddAdModal(false)} className="btn-cancel">
//                   Cancel
//                 </button>
//                 <button onClick={handleCreateAd} className="btn-create">
//                   Create Ad
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdMobSettings;
import React, { useState } from 'react';
import { Settings, Plus, Edit2, Trash2, Video, Image, Gift } from 'lucide-react';

const AdMobSettings = () => {
  const [activeTab, setActiveTab] = useState('android');
  const [showAddAdModal, setShowAddAdModal] = useState(false);
  
  // Android Settings
  const [androidSettings, setAndroidSettings] = useState({
    banner: {
      enabled: false,
      adUnitId: '',
      position: 'bottom'
    },
    interstitial: {
      enabled: false,
      adUnitId: '',
      frequency: 3,
      showOnScreens: ['home', 'category']
    },
    rewarded: {
      enabled: false,
      adUnitId: '',
      rewardAmount: 10,
      showAfter: 'download'
    }
  });

  // iOS Settings
  const [iosSettings, setIosSettings] = useState({
    banner: {
      enabled: false,
      adUnitId: '',
      position: 'bottom'
    },
    interstitial: {
      enabled: false,
      adUnitId: '',
      frequency: 3,
      showOnScreens: ['home', 'category']
    },
    rewarded: {
      enabled: false,
      adUnitId: '',
      rewardAmount: 10,
      showAfter: 'download'
    }
  });

  // Existing Ads List
  const [adsList, setAdsList] = useState([
    {
      id: 1,
      name: 'Home Banner',
      type: 'banner',
      platform: 'Android',
      adUnitId: 'ca-app-pub-3940256099942544/6300978111',
      status: 'active',
      impressions: 12500,
      clicks: 450
    },
    {
      id: 2,
      name: 'Video Interstitial',
      type: 'interstitial',
      platform: 'Android',
      adUnitId: 'ca-app-pub-3940256099942544/1033173712',
      status: 'active',
      impressions: 8200,
      clicks: 320
    },
    {
      id: 3,
      name: 'Reward Ad',
      type: 'rewarded',
      platform: 'iOS',
      adUnitId: 'ca-app-pub-3940256099942544/5224354917',
      status: 'active',
      impressions: 5400,
      clicks: 1200
    }
  ]);

  // New Ad Form
  const [newAd, setNewAd] = useState({
    name: '',
    type: 'banner',
    platform: 'android',
    adUnitId: ''
  });

  const handleToggle = (platform, adType) => {
    if (platform === 'android') {
      setAndroidSettings({
        ...androidSettings,
        [adType]: {
          ...androidSettings[adType],
          enabled: !androidSettings[adType].enabled
        }
      });
    } else {
      setIosSettings({
        ...iosSettings,
        [adType]: {
          ...iosSettings[adType],
          enabled: !iosSettings[adType].enabled
        }
      });
    }
  };

  const handleInputChange = (platform, adType, field, value) => {
    if (platform === 'android') {
      setAndroidSettings({
        ...androidSettings,
        [adType]: {
          ...androidSettings[adType],
          [field]: value
        }
      });
    } else {
      setIosSettings({
        ...iosSettings,
        [adType]: {
          ...iosSettings[adType],
          [field]: value
        }
      });
    }
  };

  const handleSaveSettings = () => {
    console.log('Android Settings:', androidSettings);
    console.log('iOS Settings:', iosSettings);
    alert('Settings saved successfully!');
  };

  const handleCreateAd = () => {
    if (!newAd.name || !newAd.adUnitId) {
      alert('Please fill all required fields');
      return;
    }

    const ad = {
      id: adsList.length + 1,
      name: newAd.name,
      type: newAd.type,
      platform: newAd.platform === 'android' ? 'Android' : 'iOS',
      adUnitId: newAd.adUnitId,
      status: 'active',
      impressions: 0,
      clicks: 0
    };

    setAdsList([...adsList, ad]);
    setShowAddAdModal(false);
    setNewAd({ name: '', type: 'banner', platform: 'android', adUnitId: '' });
    alert('Ad created successfully!');
  };

  const handleDeleteAd = (id) => {
    if (window.confirm('Are you sure you want to delete this ad?')) {
      setAdsList(adsList.filter(ad => ad.id !== id));
    }
  };

  const getAdIcon = (type) => {
    switch(type) {
      case 'banner': return <Image style={{width: '1.25rem', height: '1.25rem'}} />;
      case 'interstitial': return <Video style={{width: '1.25rem', height: '1.25rem'}} />;
      case 'rewarded': return <Gift style={{width: '1.25rem', height: '1.25rem'}} />;
      default: return <Settings style={{width: '1.25rem', height: '1.25rem'}} />;
    }
  };

  const currentSettings = activeTab === 'android' ? androidSettings : iosSettings;

  return (
    <div className="ams-page">
      <style>{`
        /* ============================================
           ADMOB SETTINGS - UNIQUE CSS WITH ams- PREFIX
           ============================================ */

        /* Reset & Base */
        .ams-page * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .ams-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        /* Header */
        .ams-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .ams-header-left {
          flex: 1;
        }

        .ams-page-title {
          font-size: 2rem;
          font-weight: 800;
          color: white;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .ams-title-icon {
          width: 2rem;
          height: 2rem;
        }

        .ams-breadcrumb {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
        }

        .ams-btn-add {
          background: white;
          color: #667eea;
          border: none;
          padding: 0.875rem 1.5rem;
          border-radius: 0.75rem;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }

        .ams-btn-add:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          background: #f8f9ff;
        }

        .ams-btn-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        /* Platform Tabs */
        .ams-tabs {
          background: white;
          border-radius: 1rem;
          padding: 0.5rem;
          display: inline-flex;
          gap: 0.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          margin-bottom: 2rem;
        }

        .ams-tab-btn {
          padding: 0.875rem 1.75rem;
          border: none;
          border-radius: 0.75rem;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          background: transparent;
          color: #64748b;
        }

        .ams-tab-btn.ams-active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .ams-tab-btn:hover:not(.ams-active) {
          background: #f1f5f9;
        }

        /* Settings Container */
        .ams-settings-container {
          display: grid;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .ams-card {
          background: white;
          border-radius: 1.25rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .ams-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .ams-card-header {
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #f1f5f9;
        }

        .ams-card-title-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .ams-icon-wrapper {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ams-icon-wrapper.ams-banner {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        }

        .ams-icon-wrapper.ams-interstitial {
          background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
        }

        .ams-icon-wrapper.ams-rewarded {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }

        .ams-card-icon {
          width: 1.75rem;
          height: 1.75rem;
          color: white;
        }

        .ams-card-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }

        .ams-card-subtitle {
          font-size: 0.875rem;
          color: #64748b;
        }

        /* Toggle Switch */
        .ams-toggle {
          position: relative;
          display: inline-block;
          width: 3.5rem;
          height: 1.75rem;
          cursor: pointer;
        }

        .ams-toggle input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .ams-toggle-slider {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #cbd5e1;
          border-radius: 2rem;
          transition: 0.3s;
        }

        .ams-toggle-slider::before {
          content: '';
          position: absolute;
          height: 1.25rem;
          width: 1.25rem;
          left: 0.25rem;
          bottom: 0.25rem;
          background: white;
          border-radius: 50%;
          transition: 0.3s;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }

        .ams-toggle input:checked + .ams-toggle-slider {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        }

        .ams-toggle input:checked + .ams-toggle-slider.ams-interstitial {
          background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
        }

        .ams-toggle input:checked + .ams-toggle-slider.ams-rewarded {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }

        .ams-toggle input:checked + .ams-toggle-slider::before {
          transform: translateX(1.75rem);
        }

        /* Card Content */
        .ams-card-content {
          padding: 1.5rem;
          display: grid;
          gap: 1.25rem;
          animation: amsSlideDown 0.3s ease;
        }

        @keyframes amsSlideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .ams-form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .ams-form-label {
          font-weight: 600;
          font-size: 0.875rem;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .ams-form-input,
        .ams-form-select {
          padding: 0.875rem 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 0.75rem;
          font-size: 1rem;
          transition: all 0.3s ease;
          font-family: 'Courier New', monospace;
          background: #f8fafc;
        }

        .ams-form-input:focus,
        .ams-form-select:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .ams-form-input::placeholder {
          color: #94a3b8;
        }

        /* Save Button */
        .ams-btn-save {
          width: 100%;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border: none;
          padding: 1.25rem;
          border-radius: 1rem;
          font-size: 1.25rem;
          font-weight: 700;
          cursor: pointer;
          margin-bottom: 2rem;
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
          transition: all 0.3s ease;
        }

        .ams-btn-save:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(16, 185, 129, 0.4);
        }

        .ams-btn-save:active {
          transform: translateY(-1px);
        }

        /* Ads Table */
        .ams-table-section {
          background: white;
          border-radius: 1.25rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .ams-section-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1e293b;
          padding: 1.5rem;
          border-bottom: 2px solid #f1f5f9;
        }

        .ams-table-wrapper {
          overflow-x: auto;
        }

        .ams-table {
          width: 100%;
          border-collapse: collapse;
        }

        .ams-table thead {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }

        .ams-table th {
          padding: 1.25rem 1.5rem;
          text-align: left;
          font-weight: 700;
          font-size: 0.875rem;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .ams-table tbody tr {
          border-bottom: 1px solid #f1f5f9;
          transition: all 0.2s ease;
        }

        .ams-table tbody tr:hover {
          background: #f8fafc;
        }

        .ams-table td {
          padding: 1.25rem 1.5rem;
          color: #334155;
          font-size: 0.95rem;
        }

        .ams-ad-name-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .ams-icon-wrapper-small {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ams-icon-wrapper-small.ams-banner {
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          color: #2563eb;
        }

        .ams-icon-wrapper-small.ams-interstitial {
          background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
          color: #9333ea;
        }

        .ams-icon-wrapper-small.ams-rewarded {
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
          color: #059669;
        }

        .ams-capitalize {
          text-transform: capitalize;
        }

        .ams-ad-unit-code {
          background: #f1f5f9;
          padding: 0.375rem 0.75rem;
          border-radius: 0.375rem;
          font-size: 0.813rem;
          color: #475569;
          font-family: 'Courier New', monospace;
          border: 1px solid #e2e8f0;
        }

        .ams-status-badge {
          display: inline-block;
          padding: 0.375rem 0.875rem;
          border-radius: 2rem;
          font-size: 0.813rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        .ams-status-badge.ams-status-active {
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
          color: #065f46;
        }

        .ams-status-badge.ams-status-inactive {
          background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
          color: #991b1b;
        }

        .ams-action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .ams-action-btn {
          width: 2.25rem;
          height: 2.25rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .ams-action-btn.ams-edit {
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          color: #2563eb;
        }

        .ams-action-btn.ams-edit:hover {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          transform: scale(1.1);
        }

        .ams-action-btn.ams-delete {
          background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
          color: #dc2626;
        }

        .ams-action-btn.ams-delete:hover {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          transform: scale(1.1);
        }

        .ams-action-icon {
          width: 1rem;
          height: 1rem;
        }

        /* Modal */
        .ams-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
          animation: amsFadeIn 0.3s ease;
        }

        @keyframes amsFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .ams-modal-content {
          background: white;
          border-radius: 1.5rem;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
          max-width: 500px;
          width: 100%;
          animation: amsSlideUp 0.3s ease;
        }

        @keyframes amsSlideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .ams-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 2px solid #f1f5f9;
        }

        .ams-modal-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1e293b;
        }

        .ams-modal-close {
          width: 2.5rem;
          height: 2.5rem;
          border: none;
          background: #f1f5f9;
          border-radius: 0.5rem;
          font-size: 1.75rem;
          color: #64748b;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .ams-modal-close:hover {
          background: #e2e8f0;
          color: #334155;
          transform: rotate(90deg);
        }

        .ams-modal-body {
          padding: 1.5rem;
        }

        .ams-modal-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .ams-btn-cancel {
          padding: 0.875rem 1.5rem;
          border: 2px solid #e2e8f0;
          background: white;
          color: #64748b;
          border-radius: 0.75rem;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .ams-btn-cancel:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          color: #334155;
        }

        .ams-btn-create {
          padding: 0.875rem 1.5rem;
          border: none;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 0.75rem;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
          transition: all 0.3s ease;
        }

        .ams-btn-create:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        .ams-btn-create:active {
          transform: translateY(0);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .ams-page {
            padding: 1rem;
          }

          .ams-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .ams-page-title {
            font-size: 1.5rem;
          }

          .ams-btn-add {
            width: 100%;
            justify-content: center;
          }

          .ams-tabs {
            width: 100%;
          }

          .ams-tab-btn {
            flex: 1;
            text-align: center;
          }

          .ams-card-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .ams-table {
            font-size: 0.875rem;
          }

          .ams-table th,
          .ams-table td {
            padding: 0.875rem;
          }

          .ams-ad-name-cell {
            flex-direction: column;
            align-items: flex-start;
          }

          .ams-modal-actions {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .ams-page-title {
            font-size: 1.25rem;
          }

          .ams-title-icon {
            width: 1.5rem;
            height: 1.5rem;
          }

          .ams-card-title {
            font-size: 1.25rem;
          }

          .ams-icon-wrapper {
            width: 3rem;
            height: 3rem;
          }

          .ams-card-icon {
            width: 1.5rem;
            height: 1.5rem;
          }

          .ams-table-wrapper {
            overflow-x: scroll;
          }

          .ams-table {
            min-width: 800px;
          }
        }

        /* Scrollbar */
        .ams-page ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }

        .ams-page ::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 5px;
        }

        .ams-page ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 5px;
        }

        .ams-page ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
        }
      `}</style>

      {/* Header */}
      <div className="ams-header">
        <div className="ams-header-left">
          <h1 className="ams-page-title">
            <Settings className="ams-title-icon" />
            AdMob Settings
          </h1>
          <p className="ams-breadcrumb">Dashboard / AdMob Settings</p>
        </div>
        <button onClick={() => setShowAddAdModal(true)} className="ams-btn-add">
          <Plus className="ams-btn-icon" />
          Add New Ad
        </button>
      </div>

      {/* Platform Tabs */}
      <div className="ams-tabs">
        <button
          onClick={() => setActiveTab('android')}
          className={`ams-tab-btn ${activeTab === 'android' ? 'ams-active' : ''}`}
        >
          Android Settings
        </button>
        <button
          onClick={() => setActiveTab('ios')}
          className={`ams-tab-btn ${activeTab === 'ios' ? 'ams-active' : ''}`}
        >
          iOS Settings
        </button>
      </div>

      {/* Settings Cards */}
      <div className="ams-settings-container">
        {/* Banner Ad */}
        <div className="ams-card">
          <div className="ams-card-header">
            <div className="ams-card-title-section">
              <div className="ams-icon-wrapper ams-banner">
                <Image className="ams-card-icon" />
              </div>
              <div>
                <h3 className="ams-card-title">Banner Ad</h3>
                <p className="ams-card-subtitle">Display banner ads in your app</p>
              </div>
            </div>
            <label className="ams-toggle">
              <input
                type="checkbox"
                checked={currentSettings.banner.enabled}
                onChange={() => handleToggle(activeTab, 'banner')}
              />
              <span className="ams-toggle-slider"></span>
            </label>
          </div>

          {currentSettings.banner.enabled && (
            <div className="ams-card-content">
              <div className="ams-form-group">
                <label className="ams-form-label">Ad Unit ID</label>
                <input
                  type="text"
                  value={currentSettings.banner.adUnitId}
                  onChange={(e) => handleInputChange(activeTab, 'banner', 'adUnitId', e.target.value)}
                  placeholder="ca-app-pub-3940256099942544/6300978111"
                  className="ams-form-input"
                />
              </div>
              <div className="ams-form-group">
                <label className="ams-form-label">Position</label>
                <select
                  value={currentSettings.banner.position}
                  onChange={(e) => handleInputChange(activeTab, 'banner', 'position', e.target.value)}
                  className="ams-form-select"
                >
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Interstitial Ad */}
        <div className="ams-card">
          <div className="ams-card-header">
            <div className="ams-card-title-section">
              <div className="ams-icon-wrapper ams-interstitial">
                <Video className="ams-card-icon" />
              </div>
              <div>
                <h3 className="ams-card-title">Interstitial Ad</h3>
                <p className="ams-card-subtitle">Full-screen ads between content</p>
              </div>
            </div>
            <label className="ams-toggle">
              <input
                type="checkbox"
                checked={currentSettings.interstitial.enabled}
                onChange={() => handleToggle(activeTab, 'interstitial')}
              />
              <span className="ams-toggle-slider ams-interstitial"></span>
            </label>
          </div>

          {currentSettings.interstitial.enabled && (
            <div className="ams-card-content">
              <div className="ams-form-group">
                <label className="ams-form-label">Ad Unit ID</label>
                <input
                  type="text"
                  value={currentSettings.interstitial.adUnitId}
                  onChange={(e) => handleInputChange(activeTab, 'interstitial', 'adUnitId', e.target.value)}
                  placeholder="ca-app-pub-3940256099942544/1033173712"
                  className="ams-form-input"
                />
              </div>
              <div className="ams-form-group">
                <label className="ams-form-label">Show After Every (clicks)</label>
                <input
                  type="number"
                  value={currentSettings.interstitial.frequency}
                  onChange={(e) => handleInputChange(activeTab, 'interstitial', 'frequency', parseInt(e.target.value))}
                  className="ams-form-input"
                />
              </div>
            </div>
          )}
        </div>

        {/* Rewarded Ad */}
        <div className="ams-card">
          <div className="ams-card-header">
            <div className="ams-card-title-section">
              <div className="ams-icon-wrapper ams-rewarded">
                <Gift className="ams-card-icon" />
              </div>
              <div>
                <h3 className="ams-card-title">Rewarded Ad</h3>
                <p className="ams-card-subtitle">Reward users for watching ads</p>
              </div>
            </div>
            <label className="ams-toggle">
              <input
                type="checkbox"
                checked={currentSettings.rewarded.enabled}
                onChange={() => handleToggle(activeTab, 'rewarded')}
              />
              <span className="ams-toggle-slider ams-rewarded"></span>
            </label>
          </div>

          {currentSettings.rewarded.enabled && (
            <div className="ams-card-content">
              <div className="ams-form-group">
                <label className="ams-form-label">Ad Unit ID</label>
                <input
                  type="text"
                  value={currentSettings.rewarded.adUnitId}
                  onChange={(e) => handleInputChange(activeTab, 'rewarded', 'adUnitId', e.target.value)}
                  placeholder="ca-app-pub-3940256099942544/5224354917"
                  className="ams-form-input"
                />
              </div>
              <div className="ams-form-group">
                <label className="ams-form-label">Reward Amount (coins/points)</label>
                <input
                  type="number"
                  value={currentSettings.rewarded.rewardAmount}
                  onChange={(e) => handleInputChange(activeTab, 'rewarded', 'rewardAmount', parseInt(e.target.value))}
                  className="ams-form-input"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <button onClick={handleSaveSettings} className="ams-btn-save">
        Save All Settings
      </button>

      {/* Ads Table */}
      <div className="ams-table-section">
        <h3 className="ams-section-title">All Ads</h3>
        <div className="ams-table-wrapper">
          <table className="ams-table">
            <thead>
              <tr>
                <th>Ad Name</th>
                <th>Type</th>
                <th>Platform</th>
                <th>Ad Unit ID</th>
                <th>Status</th>
                <th>Impressions</th>
                <th>Clicks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {adsList.map((ad) => (
                <tr key={ad.id}>
                  <td>
                    <div className="ams-ad-name-cell">
                      <div className={`ams-icon-wrapper-small ams-${ad.type}`}>
                        {getAdIcon(ad.type)}
                      </div>
                      <span>{ad.name}</span>
                    </div>
                  </td>
                  <td className="ams-capitalize">{ad.type}</td>
                  <td>{ad.platform}</td>
                  <td>
                    <code className="ams-ad-unit-code">{ad.adUnitId}</code>
                  </td>
                  <td>
                    <span className={`ams-status-badge ams-status-${ad.status}`}>
                      {ad.status}
                    </span>
                  </td>
                  <td>{ad.impressions.toLocaleString()}</td>
                  <td>{ad.clicks.toLocaleString()}</td>
                  <td>
                    <div className="ams-action-buttons">
                      <button className="ams-action-btn ams-edit">
                        <Edit2 className="ams-action-icon" />
                      </button>
                      <button onClick={() => handleDeleteAd(ad.id)} className="ams-action-btn ams-delete">
                        <Trash2 className="ams-action-icon" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Ad Modal */}
      {showAddAdModal && (
        <div className="ams-modal-overlay">
          <div className="ams-modal-content">
            <div className="ams-modal-header">
              <h3 className="ams-modal-title">Add New Ad</h3>
              <button onClick={() => setShowAddAdModal(false)} className="ams-modal-close">
                ×
              </button>
            </div>

            <div className="ams-modal-body">
              <div className="ams-form-group">
                <label className="ams-form-label">Ad Name</label>
                <input
                  type="text"
                  value={newAd.name}
                  onChange={(e) => setNewAd({ ...newAd, name: e.target.value })}
                  placeholder="e.g., Home Banner Ad"
                  className="ams-form-input"
                />
              </div>

              <div className="ams-form-group">
                <label className="ams-form-label">Ad Type</label>
                <select
                  value={newAd.type}
                  onChange={(e) => setNewAd({ ...newAd, type: e.target.value })}
                  className="ams-form-select"
                >
                  <option value="banner">Banner</option>
                  <option value="interstitial">Interstitial</option>
                  <option value="rewarded">Rewarded</option>
                </select>
              </div>

              <div className="ams-form-group">
                <label className="ams-form-label">Platform</label>
                <select
                  value={newAd.platform}
                  onChange={(e) => setNewAd({ ...newAd, platform: e.target.value })}
                  className="ams-form-select"
                >
                  <option value="android">Android</option>
                  <option value="ios">iOS</option>
                </select>
              </div>

              <div className="ams-form-group">
                <label className="ams-form-label">Ad Unit ID</label>
                <input
                  type="text"
                  value={newAd.adUnitId}
                  onChange={(e) => setNewAd({ ...newAd, adUnitId: e.target.value })}
                  placeholder="ca-app-pub-xxxxxxxxxxxxx/xxxxxxxxxx"
                  className="ams-form-input"
                />
              </div>

              <div className="ams-modal-actions">
                <button onClick={() => setShowAddAdModal(false)} className="ams-btn-cancel">
                  Cancel
                </button>
                <button onClick={handleCreateAd} className="ams-btn-create">
                  Create Ad
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdMobSettings;