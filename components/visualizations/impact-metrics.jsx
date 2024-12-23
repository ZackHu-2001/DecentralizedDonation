// components/visualizations/impact-metrics.jsx
'use client';

import React, {useEffect} from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    Legend
} from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1'];

const DataVisualization = ({
    resourceDistribution,
    impactMetrics,
    emergencyAlerts
}) => {
    useEffect(() => {
        console.log('Resource Distribution:', resourceDistribution);
    }, [resourceDistribution]);
    // Transform resource distribution data
    const resourceData = [
        { name: 'Emergency', value: resourceDistribution.emergency },
        { name: 'Reconstruction', value: resourceDistribution.reconstruction },
        { name: 'Medical', value: resourceDistribution.medical },
        { name: 'Education', value: resourceDistribution.education }
    ];

    // Transform impact metrics data
    const impactData = [
        { name: 'Communities', value: impactMetrics.communitiesSupported },
        { name: 'Projects', value: impactMetrics.infrastructureProjects },
        { name: 'Homes', value: impactMetrics.homesRebuilt },
        { name: 'Volunteers', value: Math.round(impactMetrics.volunteerCount / 100) }
    ];

    // Transform emergency alerts data
    const alertsData = emergencyAlerts.map(alert => ({
        name: alert.location,
        needed: parseFloat(alert.fundingNeeded),
        received: parseFloat(alert.fundingReceived),
        progress: (parseFloat(alert.fundingReceived) / parseFloat(alert.fundingNeeded)) * 100
    }));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Resource Distribution Chart */}
            <div className="h-[300px]">
                <h3 className="text-lg font-semibold mb-4">Resource Distribution</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={resourceData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {resourceData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => `${value}%`}
                            contentStyle={{
                                backgroundColor: 'white',
                                border: 'none',
                                borderRadius: '0.5rem',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Impact Metrics Chart */}
            <div className="h-[300px]">
                <h3 className="text-lg font-semibold mb-4">Impact Overview</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={impactData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                border: 'none',
                                borderRadius: '0.5rem',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                        />
                        <Bar
                            dataKey="value"
                            fill="#3b82f6"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Emergency Alerts Chart */}
            <div className="col-span-1 md:col-span-2 h-[300px]">
                <h3 className="text-lg font-semibold mb-4">Emergency Response Progress</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={alertsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                border: 'none',
                                borderRadius: '0.5rem',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="needed"
                            stroke="#ef4444"
                            strokeWidth={2}
                            name="Funding Needed"
                        />
                        <Line
                            type="monotone"
                            dataKey="received"
                            stroke="#10b981"
                            strokeWidth={2}
                            name="Funding Received"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DataVisualization;