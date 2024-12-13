import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Play, 
  Server, 
  Network, 
  Cpu, 
  MemoryStick, 
  HardDrive, 
  FileUp 
} from 'lucide-react';

// Main Dashboard Component
const PenTestingDashboard = () => {
  const [activeTab, setActiveTab] = useState('new-operation');
  const [operations, setOperations] = useState([]);

  // New Operation Tabs
  const NewOperationTabs = () => {
    const [operationType, setOperationType] = useState('web');
    const [webOptions, setWebOptions] = useState({
      subdomainEnum: false,
      urlEnum: false,
      subdomainTakeover: false,
      xss: false
    });
    const [mobileOptions, setMobileOptions] = useState({
      codeReview: false,
      sensitiveTextGrep: false
    });

    const renderWebPentestingOptions = () => (
      <div className="p-4 bg-gray-100 rounded">
        <div className="mb-4">
          <label className="block mb-2">Domain Names</label>
          <input 
            type="text" 
            placeholder="Enter domain names (comma-separated)" 
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <h4 className="mb-2 font-semibold">Select Testing Options:</h4>
          {Object.entries(webOptions).map(([key, value]) => (
            <div key={key} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={key}
                checked={value}
                onChange={() => setWebOptions(prev => ({
                  ...prev,
                  [key]: !prev[key]
                }))}
                className="mr-2"
              />
              <label htmlFor={key} className="capitalize">
                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </label>
            </div>
          ))}
        </div>
      </div>
    );

    const renderMobilePentestingOptions = () => (
      <div className="p-4 bg-gray-100 rounded">
        <div className="mb-4">
          <label className="block mb-2">Upload Application Files</label>
          <input 
            type="file" 
            multiple 
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <h4 className="mb-2 font-semibold">Select Testing Options:</h4>
          {Object.entries(mobileOptions).map(([key, value]) => (
            <div key={key} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={key}
                checked={value}
                onChange={() => setMobileOptions(prev => ({
                  ...prev,
                  [key]: !prev[key]
                }))}
                className="mr-2"
              />
              <label htmlFor={key} className="capitalize">
                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </label>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div>
        <div className="flex mb-4">
          <button
            className={`px-4 py-2 mr-2 ${operationType === 'web' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setOperationType('web')}
          >
            Web Pentesting
          </button>
          <button
            className={`px-4 py-2 ${operationType === 'mobile' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setOperationType('mobile')}
          >
            Mobile Pentesting
          </button>
        </div>
        {operationType === 'web' ? renderWebPentestingOptions() : renderMobilePentestingOptions()}
        <button 
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Start Operation
        </button>
      </div>
    );
  };

  // Currently Running Operations Component
  const CurrentlyRunningOperations = () => {
    const [selectedTarget, setSelectedTarget] = useState(null);

    const targets = [
      { 
        name: 'Target A', 
        tools: [
          { 
            name: 'Subdomain Enumeration', 
            networkUsage: 45, 
            cpuUsage: 30, 
            memoryUsage: 60, 
            storageUsage: 20,
            runningTime: '2h 15m'
          },
          { 
            name: 'URL Enumeration', 
            networkUsage: 35, 
            cpuUsage: 25, 
            memoryUsage: 50, 
            storageUsage: 15,
            runningTime: '1h 45m'
          }
        ]
      },
      { 
        name: 'Target B', 
        tools: [
          { 
            name: 'XSS Testing', 
            networkUsage: 55, 
            cpuUsage: 40, 
            memoryUsage: 70, 
            storageUsage: 25,
            runningTime: '3h 30m'
          }
        ]
      }
    ];

    const calculateTotalResources = (targets) => {
      return targets.reduce((total, target) => {
        target.tools.forEach(tool => {
          total.networkUsage += tool.networkUsage;
          total.cpuUsage += tool.cpuUsage;
          total.memoryUsage += tool.memoryUsage;
          total.storageUsage += tool.storageUsage;
        });
        return total;
      }, { networkUsage: 0, cpuUsage: 0, memoryUsage: 0, storageUsage: 0 });
    };

    const totalResources = calculateTotalResources(targets);

    const ResourceCard = ({ icon: Icon, label, value }) => (
      <div className="flex items-center bg-gray-100 p-3 rounded">
        <Icon className="mr-2 text-blue-500" />
        <div>
          <div className="text-sm text-gray-600">{label}</div>
          <div className="font-semibold">{value}%</div>
        </div>
      </div>
    );

    return (
      <div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            { icon: Network, label: 'Network Usage', value: totalResources.networkUsage },
            { icon: Cpu, label: 'CPU Usage', value: totalResources.cpuUsage },
            { icon: MemoryStick, label: 'Memory Usage', value: totalResources.memoryUsage },
            { icon: HardDrive, label: 'Storage Usage', value: totalResources.storageUsage }
          ].map((resource, index) => (
            <ResourceCard 
              key={index} 
              icon={resource.icon} 
              label={resource.label} 
              value={resource.value} 
            />
          ))}
        </div>
        <div className="flex">
          <div className="w-1/3 pr-4 border-r">
            <h3 className="font-bold mb-4">Targets</h3>
            {targets.map((target, index) => (
              <div 
                key={index}
                className={`p-3 mb-2 cursor-pointer ${selectedTarget === target ? 'bg-blue-100' : 'bg-gray-100'}`}
                onClick={() => setSelectedTarget(target)}
              >
                {target.name}
              </div>
            ))}
          </div>
          <div className="w-2/3 pl-4">
            {selectedTarget && (
              <div>
                <h3 className="font-bold mb-4">Target Details: {selectedTarget.name}</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { icon: Network, label: 'Network Usage', value: selectedTarget.tools.reduce((sum, tool) => sum + tool.networkUsage, 0) / selectedTarget.tools.length },
                    { icon: Cpu, label: 'CPU Usage', value: selectedTarget.tools.reduce((sum, tool) => sum + tool.cpuUsage, 0) / selectedTarget.tools.length },
                    { icon: MemoryStick, label: 'Memory Usage', value: selectedTarget.tools.reduce((sum, tool) => sum + tool.memoryUsage, 0) / selectedTarget.tools.length },
                    { icon: HardDrive, label: 'Storage Usage', value: selectedTarget.tools.reduce((sum, tool) => sum + tool.storageUsage, 0) / selectedTarget.tools.length }
                  ].map((resource, index) => (
                    <ResourceCard 
                      key={index} 
                      icon={resource.icon} 
                      label={resource.label} 
                      value={Math.round(resource.value)} 
                    />
                  ))}
                </div>
                <h4 className="font-semibold mb-2">Running Tools</h4>
                <div className="space-y-2">
                  {selectedTarget.tools.map((tool, index) => (
                    <div key={index} className="bg-gray-100 p-3 rounded">
                      <div className="flex justify-between">
                        <span>{tool.name}</span>
                        <span>Running Time: {tool.runningTime}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 mt-2">
                        <div className="text-sm">
                          <Network className="inline mr-1 text-blue-500" size={16} />
                          Network: {tool.networkUsage}%
                        </div>
                        <div className="text-sm">
                          <Cpu className="inline mr-1 text-blue-500" size={16} />
                          CPU: {tool.cpuUsage}%
                        </div>
                        <div className="text-sm">
                          <MemoryStick className="inline mr-1 text-blue-500" size={16} />
                          Memory: {tool.memoryUsage}%
                        </div>
                        <div className="text-sm">
                          <HardDrive className="inline mr-1 text-blue-500" size={16} />
                          Storage: {tool.storageUsage}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <LayoutDashboard className="mr-3 text-blue-500" size={32} />
        <h1 className="text-2xl font-bold">Penetration Testing Framework</h1>
      </div>
      
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 mr-2 flex items-center ${activeTab === 'new-operation' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('new-operation')}
        >
          <Play className="mr-2" size={16} />
          Start New Operation
        </button>
        <button
          className={`px-4 py-2 flex items-center ${activeTab === 'running-operations' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('running-operations')}
        >
          <Server className="mr-2" size={16} />
          Currently Running Operations
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        {activeTab === 'new-operation' ? <NewOperationTabs /> : <CurrentlyRunningOperations />}
      </div>
    </div>
  );
};

export default PenTestingDashboard;
// import React, { useState } from 'react';
// import { LayoutDashboard, Play, Server, CheckCircle, Monitor } from 'lucide-react';

// // Main Dashboard Component
// const PenTestingDashboard = () => {
//   const [activeTab, setActiveTab] = useState('new-operation'); // Default tab: New Operation

//   // Completed Operations Page Component
//   const CompletedOperations = () => {
//     const [selectedTarget, setSelectedTarget] = useState(null);
    
//     const targets = [
//       {
//         name: 'Target A',
//         operations: [
//           { name: 'Subdomain Enumeration', timeTaken: '2h 15m', results: 'Completed successfully', logs: 'Enumerated subdomains' },
//           { name: 'URL Enumeration', timeTaken: '1h 45m', results: 'Completed with issues', logs: 'Found vulnerable endpoints' },
//         ]
//       },
//       {
//         name: 'Target B',
//         operations: [
//           { name: 'XSS Testing', timeTaken: '3h 30m', results: 'Completed successfully', logs: 'Found multiple XSS vulnerabilities' },
//         ]
//       }
//     ];

//     return (
//       <div>
//         <h3 className="font-bold mb-4">Completed Operations</h3>
//         <div className="flex">
//           <div className="w-1/3 pr-4 border-r">
//             <h4 className="font-bold mb-4">Targets</h4>
//             {targets.map((target, index) => (
//               <div
//                 key={index}
//                 className={`p-3 mb-2 cursor-pointer ${selectedTarget === target ? 'bg-blue-100' : 'bg-gray-100'}`}
//                 onClick={() => setSelectedTarget(target)}
//               >
//                 {target.name}
//               </div>
//             ))}
//           </div>
//           <div className="w-2/3 pl-4">
//             {selectedTarget && (
//               <div>
//                 <h4 className="font-bold mb-4">Target Details: {selectedTarget.name}</h4>
//                 <div>
//                   {selectedTarget.operations.map((operation, index) => (
//                     <div key={index} className="bg-gray-100 p-4 mb-4 rounded">
//                       <h5 className="font-semibold">{operation.name}</h5>
//                       <p>Time Taken: {operation.timeTaken}</p>
//                       <p>Results: {operation.results}</p>
//                       <p>Logs: {operation.logs}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Monitor Page Component
//   const MonitorPage = () => {
//     const monitorData = [
//       { url: 'https://example.com', statusCode: '403 Forbidden', responseSize: '102KB', changeType: 'Status Code' },
//       { url: 'https://example.com/js/app.js', statusCode: '200 OK', responseSize: '3MB', changeType: 'Response Size' },
//     ];

//     return (
//       <div>
//         <h3 className="font-bold mb-4">Monitor Page</h3>
//         <div>
//           {monitorData.map((data, index) => (
//             <div key={index} className="bg-gray-100 p-4 mb-4 rounded">
//               <h5 className="font-semibold">{data.url}</h5>
//               <p>Status Code: {data.statusCode} ({data.changeType})</p>
//               <p>Response Size: {data.responseSize}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <div className="flex items-center mb-6">
//         <LayoutDashboard className="mr-3 text-blue-500" size={32} />
//         <h1 className="text-2xl font-bold">Penetration Testing Framework</h1>
//       </div>

//       {/* Menu to switch between sections */}
//       <div className="flex mb-4">
//         <button
//           className={`px-4 py-2 mr-2 flex items-center ${activeTab === 'new-operation' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           onClick={() => setActiveTab('new-operation')}
//         >
//           <Play className="mr-2" size={16} />
//           Start New Operation
//         </button>
//         <button
//           className={`px-4 py-2 flex items-center ${activeTab === 'completed-operations' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           onClick={() => setActiveTab('completed-operations')}
//         >
//           <CheckCircle className="mr-2" size={16} />
//           Completed Operations
//         </button>
//         <button
//           className={`px-4 py-2 flex items-center ${activeTab === 'monitor' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           onClick={() => setActiveTab('monitor')}
//         >
//           <Monitor className="mr-2" size={16} />
//           Monitor Page
//         </button>
//       </div>

//       {/* Conditional rendering based on activeTab */}
//       <div className="bg-white shadow-md rounded-lg p-6">
//         {activeTab === 'new-operation' && (
//           <div className="text-gray-600">Start a new pentesting operation here...</div>
//         )}
//         {activeTab === 'completed-operations' && <CompletedOperations />}
//         {activeTab === 'monitor' && <MonitorPage />}
//       </div>
//     </div>
//   );
// };

// export default PenTestingDashboard;
