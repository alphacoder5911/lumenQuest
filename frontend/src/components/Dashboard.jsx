import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { 
  mockCurrentSubscription, 
  mockRecommendation, 
  mockSubscriptionHistory, 
  mockUsageStats,
  mockUserData 
} from '../data/mockData'
import { 
  formatCurrency, 
  formatDate, 
  calculateUsagePercentage 
} from '../lib/utils'
import { 
  Wifi, 
  TrendingUp, 
  Calendar, 
  BarChart3, 
  Star,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  XCircle,
  Activity,
  Users,
  DollarSign
} from 'lucide-react'

const Dashboard = () => {
  const { currentUsage, dataQuota } = mockCurrentSubscription
  const usagePercentage = calculateUsagePercentage(currentUsage, dataQuota)
  
  const handleUpgrade = () => {
    console.log('Upgrade clicked')
    // Integration point for Person 3's plans page
  }
  
  const handleDowngrade = () => {
    console.log('Downgrade clicked')
  }
  
  const handleRenew = () => {
    console.log('Renew clicked')
  }
  
  const handleCancel = () => {
    console.log('Cancel clicked')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {mockUserData.name}
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your subscription and track your usage
            </p>
          </div>
          <Badge variant="secondary" className="text-sm">
            <Activity className="w-4 h-4 mr-1" />
            Account Active
          </Badge>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Plan</p>
                  <p className="text-2xl font-bold">{mockCurrentSubscription.planName}</p>
                </div>
                <Wifi className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Cost</p>
                  <p className="text-2xl font-bold">{formatCurrency(mockCurrentSubscription.price)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Data Used</p>
                  <p className="text-2xl font-bold">{currentUsage}GB</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Next Billing</p>
                  <p className="text-2xl font-bold">{formatDate(mockCurrentSubscription.nextBillingDate).split(',')[0]}</p>
                </div>
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Plan Overview */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wifi className="h-5 w-5" />
                Current Subscription
              </CardTitle>
              <CardDescription>
                Your active plan details and usage statistics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Plan Details */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {mockCurrentSubscription.planName}
                    </h3>
                    <p className="text-gray-600">
                      {formatCurrency(mockCurrentSubscription.price)}/month • {dataQuota}GB quota
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>Started: {formatDate(mockCurrentSubscription.startDate)}</span>
                      <span>•</span>
                      <span>Next billing: {formatDate(mockCurrentSubscription.nextBillingDate)}</span>
                    </div>
                  </div>
                  <Badge 
                    variant={mockCurrentSubscription.status === 'active' ? 'default' : 'secondary'}
                    className="capitalize"
                  >
                    {mockCurrentSubscription.status}
                  </Badge>
                </div>
              </div>

              {/* Usage Statistics */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-900">Data Usage This Month</h4>
                  <span className="text-sm font-medium text-gray-600">
                    {currentUsage}GB / {dataQuota}GB
                  </span>
                </div>
                <Progress value={usagePercentage} className="h-3" />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>{usagePercentage}% used</span>
                  <span>{dataQuota - currentUsage}GB remaining</span>
                </div>
                
                {/* Usage Insights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{mockUsageStats.averageMonthly}GB</p>
                    <p className="text-xs text-gray-500">Avg Monthly</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{mockUsageStats.peakUsage}GB</p>
                    <p className="text-xs text-gray-500">Peak Usage</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{mockUsageStats.efficiencyScore}%</p>
                    <p className="text-xs text-gray-500">Efficiency</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t">
                <Button 
                  onClick={handleUpgrade}
                  className="flex items-center gap-2"
                  size="sm"
                >
                  <ArrowUp className="h-4 w-4" />
                  Upgrade
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleDowngrade}
                  className="flex items-center gap-2"
                  size="sm"
                >
                  <ArrowDown className="h-4 w-4" />
                  Downgrade
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={handleRenew}
                  className="flex items-center gap-2"
                  size="sm"
                >
                  <RefreshCw className="h-4 w-4" />
                  Renew
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleCancel}
                  className="flex items-center gap-2"
                  size="sm"
                >
                  <XCircle className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendation */}
          <Card className="border-2 border-yellow-200 bg-gradient-to-b from-yellow-50 to-yellow-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800">
                <Star className="h-5 w-5" />
                AI Recommendation
              </CardTitle>
              <Badge variant="secondary" className="w-fit bg-yellow-200 text-yellow-800">
                {mockRecommendation.confidence}% Match
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-yellow-200">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {mockRecommendation.planName}
                  </h4>
                  <p className="text-2xl font-bold text-yellow-700 mb-2">
                    {formatCurrency(mockRecommendation.price)}/month
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    {mockRecommendation.dataQuota}GB monthly quota
                  </p>
                  <div className="bg-yellow-50 rounded p-3 border border-yellow-200">
                    <p className="text-sm font-medium text-yellow-800 mb-1">
                      Why this plan?
                    </p>
                    <p className="text-sm text-yellow-700">
                      {mockRecommendation.reason}
                    </p>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <p className="text-sm font-medium text-green-800 mb-1">
                    💡 Potential Savings
                  </p>
                  <p className="text-sm text-green-700">
                    {mockRecommendation.savings}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleUpgrade} 
                className="w-full bg-yellow-600 hover:bg-yellow-700"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Switch to This Plan
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Subscription History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your subscription history and usage patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSubscriptionHistory.map((item, index) => (
                <div 
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      item.action === 'renewed' ? 'bg-green-100' :
                      item.action === 'upgraded' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {item.action === 'renewed' ? (
                        <RefreshCw className="h-4 w-4 text-green-600" />
                      ) : item.action === 'upgraded' ? (
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Activity className="h-4 w-4 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 capitalize">
                        {item.action} {item.plan}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(item.date)} • Usage: {item.usage}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0 text-right">
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(item.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
