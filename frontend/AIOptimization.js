import React, { useState } from 'react';
import './AIOptimization.css';

const AIOptimization = () => {
  const [analysisType, setAnalysisType] = useState('plans');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const aiSuggestions = {
    planOptimization: [
      {
        type: 'pricing',
        priority: 'high',
        suggestion: 'Increase Pro Plan price by $2-3 based on high engagement (89%) and market analysis',
        impact: '+15% revenue potential',
        confidence: 94,
        details: 'Users show strong willingness to pay more for current features. Market comparison shows 23% underpricing.',
        action: 'Adjust Pricing'
      },
      {
        type: 'features',
        priority: 'medium',
        suggestion: 'Add advanced analytics feature to Basic Plan to improve 76% engagement score',
        impact: '+12% user retention',
        confidence: 87,
        details: 'User feedback indicates demand for better analytics. 67% of Basic users upgrade within 3 months.',
        action: 'Add Features'
      },
      {
        type: 'new-plan',
        priority: 'high',
        suggestion: 'Create "Team Pro" plan between Pro and Enterprise with collaborative features',
        impact: '+25% market coverage',
        confidence: 91,
        details: 'Gap analysis shows 340+ potential customers seeking team features without enterprise pricing.',
        action: 'Create Plan'
      }
    ],
    discountOptimization: [
      {
        type: 'seasonal',
        priority: 'high',
        suggestion: 'Launch 20% winter promotion for Enterprise plan during low-demand period',
        impact: '+35% conversions',
        confidence: 89,
        details: 'Historical data shows 40% increase in enterprise signups with winter promotions.',
        action: 'Create Discount'
      },
      {
        type: 'usage-based',
        priority: 'medium',
        suggestion: 'Implement usage-based discount: 10% off after 6 months for high-engagement users',
        impact: '+18% loyalty',
        confidence: 85,
        details: 'Loyalty programs increase customer lifetime value by average 23% in SaaS industry.',
        action: 'Setup Automation'
      }
    ],
    marketTrends: [
      {
        trend: 'AI Features Demand',
        description: 'Market shows 67% increase in demand for AI-powered features in subscription services',
        recommendation: 'Consider adding AI assistant or automation features to Pro+ plans',
        timeframe: '3-6 months'
      },
      {
        trend: 'Flexible Billing',
        description: 'Pay-per-use and hybrid billing models growing by 45% in your industry',
        recommendation: 'Test hybrid billing option for Enterprise customers',
        timeframe: '2-4 months'
      },
      {
        trend: 'Mobile-First Usage',
        description: 'Mobile usage increased 34% - users prefer mobile-optimized features',
        recommendation: 'Prioritize mobile app features in roadmap and marketing',
        timeframe: '1-3 months'
      }
    ]
  };

  const runAIAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  const implementSuggestion = (suggestion) => {
    alert(`Implementing: ${suggestion.suggestion}\n\nThis would typically integrate with your backend systems to apply the changes automatically.`);
  };

  return (
    <div className="ai-optimization">
      {/* Header */}
      <div className="ai-header">
        <div className="header-content">
          <h2>🤖 AI-Powered Optimization</h2>
          <p>Get intelligent suggestions for plans, pricing, and discounts based on market trends and customer behavior</p>
        </div>
        <button 
          className={`ai-analyze-btn ${isAnalyzing ? 'analyzing' : ''}`}
          onClick={runAIAnalysis}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <span className="loading-spinner"></span>
              Analyzing...
            </>
          ) : (
            <>🔍 Run AI Analysis</>
          )}
        </button>
      </div>

      {/* Analysis Type Selector */}
      <div className="analysis-selector">
        <button 
          className={`selector-btn ${analysisType === 'plans' ? 'active' : ''}`}
          onClick={() => setAnalysisType('plans')}
        >
          📋 Plan Optimization
        </button>
        <button 
          className={`selector-btn ${analysisType === 'discounts' ? 'active' : ''}`}
          onClick={() => setAnalysisType('discounts')}
        >
          💰 Discount Strategy
        </button>
        <button 
          className={`selector-btn ${analysisType === 'market' ? 'active' : ''}`}
          onClick={() => setAnalysisType('market')}
        >
          📈 Market Trends
        </button>
      </div>

      {/* AI Suggestions Content */}
      {analysisType === 'plans' && (
        <div className="suggestions-container">
          <div className="section-header">
            <h3>Plan & Pricing Optimization Suggestions</h3>
            <p>AI-generated recommendations based on user behavior and market analysis</p>
          </div>
          
          <div className="suggestions-grid">
            {aiSuggestions.planOptimization.map((suggestion, index) => (
              <div key={index} className={`suggestion-card ${suggestion.priority}`}>
                <div className="suggestion-header">
                  <div className="suggestion-type">
                    <span className="type-icon">
                      {suggestion.type === 'pricing' ? '💲' : 
                       suggestion.type === 'features' ? '⭐' : '🆕'}
                    </span>
                    <span className="type-label">
                      {suggestion.type === 'pricing' ? 'Pricing Optimization' :
                       suggestion.type === 'features' ? 'Feature Enhancement' : 'New Plan Opportunity'}
                    </span>
                  </div>
                  <span className={`priority-badge ${suggestion.priority}`}>
                    {suggestion.priority} Priority
                  </span>
                </div>
                
                <div className="suggestion-content">
                  <p className="suggestion-text">{suggestion.suggestion}</p>
                  
                  <div className="suggestion-metrics">
                    <div className="metric">
                      <span className="metric-label">Expected Impact</span>
                      <span className="metric-value impact">{suggestion.impact}</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">AI Confidence</span>
                      <span className="metric-value confidence">{suggestion.confidence}%</span>
                    </div>
                  </div>
                  
                  <div className="suggestion-details">
                    <p>{suggestion.details}</p>
                  </div>
                </div>
                
                <div className="suggestion-actions">
                  <button 
                    className="implement-btn"
                    onClick={() => implementSuggestion(suggestion)}
                  >
                    {suggestion.action}
                  </button>
                  <button className="details-btn">View Analysis</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {analysisType === 'discounts' && (
        <div className="suggestions-container">
          <div className="section-header">
            <h3>Discount Strategy Optimization</h3>
            <p>Smart discount recommendations to boost conversions and customer loyalty</p>
          </div>
          
          <div className="suggestions-grid">
            {aiSuggestions.discountOptimization.map((suggestion, index) => (
              <div key={index} className={`suggestion-card ${suggestion.priority}`}>
                <div className="suggestion-header">
                  <div className="suggestion-type">
                    <span className="type-icon">
                      {suggestion.type === 'seasonal' ? '🎄' : '📊'}
                    </span>
                    <span className="type-label">
                      {suggestion.type === 'seasonal' ? 'Seasonal Campaign' : 'Usage-Based Discount'}
                    </span>
                  </div>
                  <span className={`priority-badge ${suggestion.priority}`}>
                    {suggestion.priority} Priority
                  </span>
                </div>
                
                <div className="suggestion-content">
                  <p className="suggestion-text">{suggestion.suggestion}</p>
                  
                  <div className="suggestion-metrics">
                    <div className="metric">
                      <span className="metric-label">Expected Impact</span>
                      <span className="metric-value impact">{suggestion.impact}</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">AI Confidence</span>
                      <span className="metric-value confidence">{suggestion.confidence}%</span>
                    </div>
                  </div>
                  
                  <div className="suggestion-details">
                    <p>{suggestion.details}</p>
                  </div>
                </div>
                
                <div className="suggestion-actions">
                  <button 
                    className="implement-btn"
                    onClick={() => implementSuggestion(suggestion)}
                  >
                    {suggestion.action}
                  </button>
                  <button className="details-btn">View Analysis</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {analysisType === 'market' && (
        <div className="suggestions-container">
          <div className="section-header">
            <h3>Market Trends & Insights</h3>
            <p>Industry trends and competitive analysis to stay ahead</p>
          </div>
          
          <div className="trends-grid">
            {aiSuggestions.marketTrends.map((trend, index) => (
              <div key={index} className="trend-card">
                <div className="trend-header">
                  <h4>{trend.trend}</h4>
                  <span className="trend-timeframe">{trend.timeframe}</span>
                </div>
                
                <div className="trend-content">
                  <p className="trend-description">{trend.description}</p>
                  <div className="trend-recommendation">
                    <strong>Recommendation:</strong>
                    <p>{trend.recommendation}</p>
                  </div>
                </div>
                
                <div className="trend-actions">
                  <button className="explore-btn">Explore Opportunity</button>
                  <button className="bookmark-btn">📌 Save for Later</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Insights Summary */}
      <div className="ai-summary">
        <h3>🎯 Key AI Insights</h3>
        <div className="insights-grid">
          <div className="insight-card">
            <span className="insight-icon">💡</span>
            <div className="insight-content">
              <h4>Revenue Optimization</h4>
              <p>Potential 23% revenue increase through pricing adjustments and new plan creation</p>
            </div>
          </div>
          <div className="insight-card">
            <span className="insight-icon">🎯</span>
            <div className="insight-content">
              <h4>Customer Retention</h4>
              <p>Targeted feature additions could improve retention by 15% across all plans</p>
            </div>
          </div>
          <div className="insight-card">
            <span className="insight-icon">🚀</span>
            <div className="insight-content">
              <h4>Market Position</h4>
              <p>Early adoption of AI features could capture 12% more market share</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIOptimization;
