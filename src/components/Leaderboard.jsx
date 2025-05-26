import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

export default function Leaderboard() {
  const [activeView, setActiveView] = useState('classroom')
  const [timeFilter, setTimeFilter] = useState('week')
  const [subjectFilter, setSubjectFilter] = useState('all')
  const [leaderboardData, setLeaderboardData] = useState([])
  const [userStats, setUserStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock data generation
  useEffect(() => {
    const generateMockData = () => {
      const names = [
        'Emma Johnson', 'Liam Smith', 'Olivia Brown', 'Noah Davis', 'Ava Wilson',
        'Elijah Miller', 'Sophia Garcia', 'Mason Rodriguez', 'Isabella Martinez', 'William Anderson'
      ]
      
      const classrooms = ['3A', '3B', '4A', '4B', '5A', '5B']
      const avatars = ['🦄', '🚀', '⭐', '🎯', '🏆', '🎨', '🎪', '🎭', '🎨', '🎯']
      
      return names.map((name, index) => ({
        id: index + 1,
        name,
        classroom: classrooms[Math.floor(Math.random() * classrooms.length)],
        avatar: avatars[index],
        totalPoints: Math.floor(Math.random() * 2000) + 500,
        mathPoints: Math.floor(Math.random() * 1000) + 200,
        sciencePoints: Math.floor(Math.random() * 1000) + 200,
        level: Math.floor(Math.random() * 10) + 1,
        badges: Math.floor(Math.random() * 15) + 3,
        streak: Math.floor(Math.random() * 30) + 1,
        accuracy: Math.floor(Math.random() * 30) + 70,
        problemsSolved: Math.floor(Math.random() * 200) + 50,
        rank: index + 1,
        weeklyGain: Math.floor(Math.random() * 200) + 50,
        isFriend: Math.random() > 0.7
      })).sort((a, b) => b.totalPoints - a.totalPoints)
    }

    setIsLoading(true)
    setTimeout(() => {
      const data = generateMockData()
      setLeaderboardData(data)
      setUserStats({
        ...data[4],
        name: 'You',
        rank: 5
      })
      setIsLoading(false)
    }, 1000)
  }, [timeFilter, subjectFilter])

  const handleAddFriend = (playerId) => {
    setLeaderboardData(prev => prev.map(player => 
      player.id === playerId 
        ? { ...player, isFriend: true }
        : player
    ))
    toast.success('Friend request sent!')
  }

  const handleChallenge = (player) => {
    toast.success(`Challenge sent to ${player.name}! They will be notified.`)
  }

  const filteredData = leaderboardData.filter(player => {
    if (activeView === 'friends' && !player.isFriend) return false
    if (activeView === 'classroom' && userStats && player.classroom !== userStats.classroom) return false
    return true
  })

  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return `#${rank}`
  }

  const getRankColor = (rank) => {
    if (rank === 1) return 'text-yellow-600'
    if (rank === 2) return 'text-gray-600'
    if (rank === 3) return 'text-orange-600'
    return 'text-surface-600 dark:text-surface-400'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-surface-600 dark:text-surface-400">Loading leaderboard...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-4">
            🏆 Leaderboard
          </h1>
          <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
            See how you stack up against your classmates and friends
          </p>
        </motion.div>

        {/* User Stats Card */}
        {userStats && (
          <motion.div
            className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-6 sm:p-8 shadow-card border border-surface-100 dark:border-surface-700 mb-8 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <div className="text-4xl">{userStats.avatar}</div>
                <div>
                  <h3 className="text-xl font-bold">{userStats.name}</h3>
                  <p className="text-primary-light">Rank #{userStats.rank} • Level {userStats.level}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{userStats.totalPoints.toLocaleString()}</div>
                  <div className="text-sm text-primary-light">Total Points</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{userStats.badges}</div>
                  <div className="text-sm text-primary-light">Badges</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{userStats.streak}</div>
                  <div className="text-sm text-primary-light">Day Streak</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          className="bg-white dark:bg-surface-800 rounded-2xl p-4 sm:p-6 shadow-card border border-surface-100 dark:border-surface-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            {/* View Toggle */}
            <div className="flex space-x-2">
              {[
                { id: 'classroom', label: 'My Class', icon: 'School' },
                { id: 'friends', label: 'Friends', icon: 'Users' },
                { id: 'global', label: 'Global', icon: 'Globe' }
              ].map((view) => (
                <motion.button
                  key={view.id}
                  onClick={() => setActiveView(view.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    activeView === view.id
                      ? 'bg-primary text-white shadow-card'
                      : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ApperIcon name={view.icon} className="w-4 h-4" />
                  <span>{view.label}</span>
                </motion.button>
              ))}
            </div>
            
            {/* Time and Subject Filters */}
            <div className="flex space-x-3">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white text-sm"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="all">All Time</option>
              </select>
              
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white text-sm"
              >
                <option value="all">All Subjects</option>
                <option value="math">Math Only</option>
                <option value="science">Science Only</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          className="bg-white dark:bg-surface-800 rounded-3xl shadow-card border border-surface-100 dark:border-surface-700 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Header */}
          <div className="bg-surface-50 dark:bg-surface-700 px-6 py-4 border-b border-surface-200 dark:border-surface-600">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-surface-900 dark:text-white">
                {activeView === 'classroom' ? 'Classroom Rankings' :
                 activeView === 'friends' ? 'Friends Rankings' : 'Global Rankings'}
              </h3>
              <span className="text-sm text-surface-600 dark:text-surface-400">
                {filteredData.length} players
              </span>
            </div>
          </div>
          
          {/* List */}
          <div className="divide-y divide-surface-200 dark:divide-surface-600">
            <AnimatePresence>
              {filteredData.slice(0, 20).map((player, index) => (
                <motion.div
                  key={player.id}
                  className={`p-4 sm:p-6 hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors ${
                    player.name === 'You' ? 'bg-primary/5 border-l-4 border-primary' : ''
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Rank */}
                      <div className={`text-2xl font-bold ${getRankColor(player.rank)} min-w-[3rem] text-center`}>
                        {getRankIcon(player.rank)}
                      </div>
                      
                      {/* Avatar & Info */}
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{player.avatar}</div>
                        <div>
                          <h4 className="font-semibold text-surface-900 dark:text-white flex items-center space-x-2">
                            <span>{player.name}</span>
                            {player.name === 'You' && (
                              <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-lg font-medium">
                                You
                              </span>
                            )}
                          </h4>
                          <div className="flex items-center space-x-3 text-sm text-surface-600 dark:text-surface-400">
                            <span>Level {player.level}</span>
                            <span>•</span>
                            <span>{player.classroom}</span>
                            <span>•</span>
                            <span>{player.accuracy}% accuracy</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {/* Stats */}
                      <div className="text-right hidden sm:block">
                        <div className="text-xl font-bold text-surface-900 dark:text-white">
                          {player.totalPoints.toLocaleString()}
                        </div>
                        <div className="text-sm text-surface-600 dark:text-surface-400">
                          +{player.weeklyGain} this week
                        </div>
                      </div>
                      
                      {/* Actions */}
                      {player.name !== 'You' && (
                        <div className="flex space-x-2">
                          {!player.isFriend && (
                            <motion.button
                              onClick={() => handleAddFriend(player.id)}
                              className="p-2 text-accent hover:bg-accent/10 rounded-lg transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              title="Add Friend"
                            >
                              <ApperIcon name="UserPlus" className="w-4 h-4" />
                            </motion.button>
                          )}
                          
                          <motion.button
                            onClick={() => handleChallenge(player)}
                            className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Challenge"
                          >
                            <ApperIcon name="Zap" className="w-4 h-4" />
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Detailed Stats (Mobile) */}
                  <div className="sm:hidden mt-3 pt-3 border-t border-surface-200 dark:border-surface-600">
                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                      <div>
                        <div className="font-semibold text-surface-900 dark:text-white">
                          {player.totalPoints.toLocaleString()}
                        </div>
                        <div className="text-surface-600 dark:text-surface-400">Points</div>
                      </div>
                      <div>
                        <div className="font-semibold text-surface-900 dark:text-white">
                          {player.badges}
                        </div>
                        <div className="text-surface-600 dark:text-surface-400">Badges</div>
                      </div>
                      <div>
                        <div className="font-semibold text-surface-900 dark:text-white">
                          {player.streak}
                        </div>
                        <div className="text-surface-600 dark:text-surface-400">Streak</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
        
        {/* Load More */}
        {filteredData.length > 20 && (
          <div className="text-center mt-8">
            <motion.button
              className="px-6 py-3 bg-white dark:bg-surface-800 text-surface-900 dark:text-white rounded-2xl font-medium shadow-card hover:shadow-soft transition-all duration-300 border border-surface-200 dark:border-surface-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toast.info('Loading more players...')}
            >
              Load More Players
            </motion.button>
          </div>
        )}
      </div>
    </div>
  )
}
