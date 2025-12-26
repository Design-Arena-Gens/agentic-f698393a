'use client';

import { useState } from 'react';
import { Mail, MessageCircle, Linkedin, Send, Users, TrendingUp, BarChart3, Settings, Play, Pause } from 'lucide-react';

type Platform = 'linkedin' | 'whatsapp' | 'gmail';

interface Campaign {
  id: string;
  name: string;
  platform: Platform;
  status: 'active' | 'paused' | 'completed';
  sent: number;
  responses: number;
  leads: number;
}

interface Lead {
  id: string;
  name: string;
  company: string;
  platform: Platform;
  status: 'new' | 'contacted' | 'interested' | 'converted';
  lastContact: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'campaigns' | 'leads' | 'settings'>('dashboard');
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: '1', name: 'LinkedIn Textile Buyers', platform: 'linkedin', status: 'active', sent: 145, responses: 23, leads: 8 },
    { id: '2', name: 'WhatsApp Import Agents', platform: 'whatsapp', status: 'active', sent: 89, responses: 34, leads: 12 },
    { id: '3', name: 'Gmail International Distributors', platform: 'gmail', status: 'paused', sent: 67, responses: 15, leads: 5 },
  ]);

  const [leads, setLeads] = useState<Lead[]>([
    { id: '1', name: 'John Smith', company: 'Global Textiles Inc', platform: 'linkedin', status: 'interested', lastContact: '2 hours ago' },
    { id: '2', name: 'Ahmed Hassan', company: 'Middle East Imports', platform: 'whatsapp', status: 'new', lastContact: '1 day ago' },
    { id: '3', name: 'Maria Garcia', company: 'European Trading Co', platform: 'gmail', status: 'contacted', lastContact: '3 days ago' },
    { id: '4', name: 'Chen Wei', company: 'Asia Pacific Exports', platform: 'linkedin', status: 'interested', lastContact: '5 hours ago' },
    { id: '5', name: 'Robert Johnson', company: 'US Import Solutions', platform: 'whatsapp', status: 'converted', lastContact: '1 week ago' },
  ]);

  const toggleCampaignStatus = (id: string) => {
    setCampaigns(campaigns.map(c =>
      c.id === id ? { ...c, status: c.status === 'active' ? 'paused' : 'active' as any } : c
    ));
  };

  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case 'linkedin': return <Linkedin className="w-5 h-5 text-blue-600" />;
      case 'whatsapp': return <MessageCircle className="w-5 h-5 text-green-600" />;
      case 'gmail': return <Mail className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-purple-100 text-purple-800';
      case 'interested': return 'bg-orange-100 text-orange-800';
      case 'converted': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalSent = campaigns.reduce((sum, c) => sum + c.sent, 0);
  const totalResponses = campaigns.reduce((sum, c) => sum + c.responses, 0);
  const totalLeads = campaigns.reduce((sum, c) => sum + c.leads, 0);
  const responseRate = totalSent > 0 ? ((totalResponses / totalSent) * 100).toFixed(1) : '0';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Export Sales AI Agent</h1>
                <p className="text-sm text-gray-600">LinkedIn • WhatsApp • Gmail Automation</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Active
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'campaigns', label: 'Campaigns', icon: Send },
              { id: 'leads', label: 'Leads', icon: Users },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-3 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Sent</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{totalSent}</p>
                  </div>
                  <Send className="w-12 h-12 text-blue-500 opacity-20" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Responses</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{totalResponses}</p>
                  </div>
                  <MessageCircle className="w-12 h-12 text-green-500 opacity-20" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Leads Generated</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{totalLeads}</p>
                  </div>
                  <Users className="w-12 h-12 text-purple-500 opacity-20" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Response Rate</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{responseRate}%</p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-orange-500 opacity-20" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {leads.slice(0, 3).map(lead => (
                    <div key={lead.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getPlatformIcon(lead.platform)}
                        <div>
                          <p className="font-medium text-gray-900">{lead.name}</p>
                          <p className="text-sm text-gray-600">{lead.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                        <span className="text-sm text-gray-500">{lead.lastContact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Campaign Management</h2>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                Create New Campaign
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {campaigns.map(campaign => (
                <div key={campaign.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getPlatformIcon(campaign.platform)}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                        <p className="text-sm text-gray-600 capitalize">{campaign.platform}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                      <button
                        onClick={() => toggleCampaignStatus(campaign.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {campaign.status === 'active' ? (
                          <Pause className="w-5 h-5 text-gray-600" />
                        ) : (
                          <Play className="w-5 h-5 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Messages Sent</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{campaign.sent}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Responses</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{campaign.responses}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Leads</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{campaign.leads}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Lead Management</h2>
              <div className="flex space-x-3">
                <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>All Platforms</option>
                  <option>LinkedIn</option>
                  <option>WhatsApp</option>
                  <option>Gmail</option>
                </select>
                <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>All Status</option>
                  <option>New</option>
                  <option>Contacted</option>
                  <option>Interested</option>
                  <option>Converted</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.map(lead => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{lead.company}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getPlatformIcon(lead.platform)}
                          <span className="text-sm text-gray-900 capitalize">{lead.platform}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {lead.lastContact}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Integration Settings</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* LinkedIn */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Linkedin className="w-8 h-8 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">LinkedIn</h3>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Connected
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Automate LinkedIn outreach to potential buyers and distributors</p>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Configure
                </button>
              </div>

              {/* WhatsApp */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-8 h-8 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900">WhatsApp</h3>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Connected
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Send automated messages to international trade contacts</p>
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                  Configure
                </button>
              </div>

              {/* Gmail */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-8 h-8 text-red-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Gmail</h3>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Connected
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Send personalized email campaigns to import agents</p>
                <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
                  Configure
                </button>
              </div>
            </div>

            {/* AI Settings */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Message Templates</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Initial Outreach Message</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={4}
                    defaultValue="Hello {name}, I noticed your company {company} is involved in international trade. We specialize in high-quality export products and would love to explore potential business opportunities with you."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Follow-up Message</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={4}
                    defaultValue="Hi {name}, just following up on my previous message. Would you be interested in learning more about our export products? I can share our catalog and pricing details."
                  />
                </div>
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                  Save Templates
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
