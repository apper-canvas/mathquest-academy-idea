import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

export default function MultipLayerMode() {
  const [activeTab, setActiveTab] = useState('join')
  const [sessions, setSessions] = useState([])
  const [currentSession, setCurrentSession] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  const [participants, setParticipants] = useState([])
  const [sessionCode, setSessionCode] = useState('')
  const [playerName, setPlayerName] = useState('')
  const [newSessionData, setNewSessionData] = useState({
    title: '',
    subject: 'Math',
    difficulty: 1,
    maxParticipants: 30,
    duration: 20
  })

  // Mock data for demonstration
  useEffect(() => {
    const mockSessions = [
      {
        id: 'sess_001',
        code: 'MATH123',
        title: 'Grade 3 Addition Challenge',
        subject: 'Math',
        difficulty: 1,
        participants: 12,
        maxParticipants: 30,
        status: 'waiting',
        teacher: 'Ms. Johnson',
        classroom: '3A'
      },
      {
        id: 'sess_002',
        code: 'SCI456',
        title: 'Solar System Quiz',
        subject: 'Science',
        difficulty: 2,
        participants: 8,
        maxParticipants: 25,
        status: 'active',
        teacher: 'Mr. Davis',
        classroom: '4B'
      },
      {
        id: 'sess_003',
        code: 'TOUR789',
        title: 'Spring Math Tournament',
        subject: 'Math',
        difficulty: 3,
        participants: 45,
        maxParticipants: 100,
        status: 'tournament',
        teacher: 'Tournament Host',
        classroom: 'All Grades'
      }
    ]
    setSessions(mockSessions)
  }, [])

  const handleJoinSession = (sessionId) => {
    if (!playerName.trim()) {
      toast.error('Please enter your name first!')
      return
    }

    const session = sessions.find(s => s.id === sessionId)
    if (session) {
      setCurrentSession(session)
      toast.success(`Joined ${session.title}! Good luck!`)
      
      // Update participants count
      setSessions(prev => prev.map(s => 
        s.id === sessionId 
          ? { ...s, participants: s.participants + 1 }
          : s
      ))
    }
  }

  const handleJoinByCode = () => {
    if (!sessionCode.trim() || !playerName.trim()) {
      toast.error('Please enter both session code and your name!')
      return
    }

    const session = sessions.find(s => s.code === sessionCode.toUpperCase())
    if (session) {
      handleJoinSession(session.id)
    } else {
      toast.error('Session not found. Please check the code and try again.')
    }
  }

  const handleCreateSession = () => {
    if (!newSessionData.title.trim()) {
      toast.error('Please enter a session title!')
      return
    }

    setIsCreating(true)
    
    setTimeout(() => {
      const newSession = {
        id: `sess_${Date.now()}`,
        code: Math.random().toString(36).substr(2, 6).toUpperCase(),
        ...newSessionData,
        participants: 1,
        status: 'waiting',
        teacher: 'You',
        classroom: 'Your Class'
      }
      
      setSessions(prev => [newSession, ...prev])
      setCurrentSession(newSession)
      setIsCreating(false)
      toast.success(`Session created! Share code: ${newSession.code}`)
      
      // Reset form
      setNewSessionData({
        title: '',
        subject: 'Math',
        difficulty: 1,
        maxParticipants: 30,
        duration: 20
      })
    }, 1500)
  }

  const handleLeaveSession = () => {
    if (currentSession) {
      toast.info('Left the session')
      setCurrentSession(null)
    }
  }

  if (currentSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Session Header */}
          <motion.div
            className="bg-white dark:bg-surface-800 rounded-3xl p-6 sm:p-8 shadow-card border border-surface-100 dark:border-surface-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white mb-2">
                  {currentSession.title}
                </h2>
                <div className="flex items-center space-x-4 text-sm text-surface-600 dark:text-surface-400">
                  <span className="flex items-center space-x-1">
                    <ApperIcon name="User" className="w-4 h-4" />
                    <span>{currentSession.teacher}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <ApperIcon name="MapPin" className="w-4 h-4" />
                    <span>{currentSession.classroom}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <ApperIcon name="Hash" className="w-4 h-4" />
                    <span>{currentSession.code}</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                <div className="flex items-center space-x-2 px-3 py-2 bg-accent/10 rounded-lg">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span className="text-accent font-medium">{currentSession.participants} online</span>
                </div>
                <motion.button
                  onClick={handleLeaveSession}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Leave
                </motion.button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-surface-50 dark:bg-surface-700 rounded-lg">
                <div className="text-lg font-bold text-surface-900 dark:text-white">{currentSession.subject}</div>
                <div className="text-sm text-surface-600 dark:text-surface-400">Subject</div>
              </div>
              <div className="text-center p-3 bg-surface-50 dark:bg-surface-700 rounded-lg">
                <div className="text-lg font-bold text-surface-900 dark:text-white">Level {currentSession.difficulty}</div>
                <div className="text-sm text-surface-600 dark:text-surface-400">Difficulty</div>
              </div>
              <div className="text-center p-3 bg-surface-50 dark:bg-surface-700 rounded-lg">
                <div className="text-lg font-bold text-surface-900 dark:text-white">{currentSession.duration}min</div>
                <div className="text-sm text-surface-600 dark:text-surface-400">Duration</div>
              </div>
              <div className="text-center p-3 bg-surface-50 dark:bg-surface-700 rounded-lg">
                <div className="text-lg font-bold text-surface-900 dark:text-white">{currentSession.status}</div>
                <div className="text-sm text-surface-600 dark:text-surface-400">Status</div>
              </div>
            </div>
          </motion.div>

          {/* Waiting Room */}
          <motion.div
            className="bg-white dark:bg-surface-800 rounded-3xl p-6 sm:p-8 shadow-card border border-surface-100 dark:border-surface-700 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Users" className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-2">
                Waiting for other players...
              </h3>
              <p className="text-surface-600 dark:text-surface-400">
                The session will begin when all players are ready
              </p>
            </div>
            
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-accent to-green-600 text-white rounded-2xl font-semibold text-lg shadow-card hover:shadow-soft transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toast.success('Ready! Waiting for others...')}
            >
              I'm Ready!
            </motion.button>
          </motion.div>
        </div>
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
            Multiplayer Mode
          </h1>
          <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
            Join classroom sessions or create your own learning challenges
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-surface-800 rounded-2xl p-2 shadow-card border border-surface-100 dark:border-surface-700">
            <div className="flex space-x-2">
              {[
                { id: 'join', label: 'Join Session', icon: 'Users' },
                { id: 'create', label: 'Create Session', icon: 'Plus' }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-primary text-white shadow-card'
                      : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ApperIcon name={tab.icon} className="w-5 h-5" />
                  <span>{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'join' && (
            <motion.div
              key="join"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-4xl mx-auto"
            >
              {/* Join by Code */}
              <motion.div
                className="bg-white dark:bg-surface-800 rounded-3xl p-6 sm:p-8 shadow-card border border-surface-100 dark:border-surface-700 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-6 flex items-center space-x-2">
                  <ApperIcon name="Hash" className="w-6 h-6 text-primary" />
                  <span>Join with Session Code</span>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200"
                      required
                    />
                    {!playerName.trim() && (
                      <div className="absolute -bottom-5 left-0 text-xs text-red-500">
                        Name required to join
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter Session Code *"
                      value={sessionCode}
                      onChange={(e) => setSessionCode(e.target.value.toUpperCase())}
                      className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200"
                      required
                    />
                    {!sessionCode.trim() && (
                      <div className="absolute -bottom-5 left-0 text-xs text-red-500">
                        Session code required
                      </div>
                    )}
                  </div>
                  <motion.button
                    onClick={handleJoinByCode}
                    disabled={!playerName.trim() || !sessionCode.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                    whileHover={playerName.trim() && sessionCode.trim() ? { scale: 1.02 } : {}}
                    whileTap={playerName.trim() && sessionCode.trim() ? { scale: 0.98 } : {}}
                  >
                    Join Session
                  </motion.button>
                </div>
                
                {(!playerName.trim() || !sessionCode.trim()) && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <ApperIcon name="Info" className="w-4 h-4 inline mr-1" />
                      Please enter both your name and the session code to join.
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Available Sessions */}
              <motion.div
                className="bg-white dark:bg-surface-800 rounded-3xl p-6 sm:p-8 shadow-card border border-surface-100 dark:border-surface-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-6 flex items-center space-x-2">
                  <ApperIcon name="Users" className="w-6 h-6 text-accent" />
                  <span>Available Sessions</span>
                </h3>
                
                <div className="grid gap-4">
                  {sessions.map((session) => (
                    <motion.div
                      key={session.id}
                      className="p-4 sm:p-6 border border-surface-200 dark:border-surface-600 rounded-2xl hover:border-primary transition-colors"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold text-surface-900 dark:text-white">
                              {session.title}
                            </h4>
                            <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                              session.status === 'active' ? 'bg-accent/10 text-accent' :
                              session.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {session.status === 'tournament' ? 'Tournament' : session.status}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-surface-600 dark:text-surface-400 mb-3">
                            <span className="flex items-center space-x-1">
                              <ApperIcon name="User" className="w-4 h-4" />
                              <span>{session.teacher}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <ApperIcon name="BookOpen" className="w-4 h-4" />
                              <span>{session.subject}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <ApperIcon name="Hash" className="w-4 h-4" />
                              <span>{session.code}</span>
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="text-surface-600 dark:text-surface-400">
                              {session.participants}/{session.maxParticipants} players
                            </span>
                            <div className="flex items-center space-x-1">
                              {[...Array(session.difficulty)].map((_, i) => (
                                <ApperIcon key={i} name="Star" className="w-4 h-4 text-secondary" />
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 sm:mt-0 sm:ml-4">
                          {!playerName.trim() ? (
                            <div className="text-center">
                              <div className="px-4 py-2 bg-gray-100 text-gray-500 rounded-xl font-medium cursor-not-allowed">
                                Enter name above
                              </div>
                              <div className="text-xs text-gray-400 mt-1">Name required to join</div>
                            </div>
                          ) : (
                            <motion.button
                              onClick={() => handleJoinSession(session.id)}
                              disabled={session.participants >= session.maxParticipants}
                              className="px-4 py-2 bg-gradient-to-r from-accent to-green-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                              whileHover={session.participants < session.maxParticipants ? { scale: 1.05 } : {}}
                              whileTap={session.participants < session.maxParticipants ? { scale: 0.95 } : {}}
                            >
                              {session.participants >= session.maxParticipants ? 'Full' : 'Join Session'}
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'create' && (
            <motion.div
              key="create"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <motion.div
                className="bg-white dark:bg-surface-800 rounded-3xl p-6 sm:p-8 shadow-card border border-surface-100 dark:border-surface-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-6 flex items-center space-x-2">
                  <ApperIcon name="Plus" className="w-6 h-6 text-primary" />
                  <span>Create New Session</span>
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Session Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Grade 3 Math Challenge"
                      value={newSessionData.title}
                      onChange={(e) => setNewSessionData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Subject
                      </label>
                      <select
                        value={newSessionData.subject}
                        onChange={(e) => setNewSessionData(prev => ({ ...prev, subject: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      >
                        <option value="Math">Math</option>
                        <option value="Science">Science</option>
                        <option value="Mixed">Mixed</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Difficulty Level
                      </label>
                      <select
                        value={newSessionData.difficulty}
                        onChange={(e) => setNewSessionData(prev => ({ ...prev, difficulty: parseInt(e.target.value) }))}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      >
                        <option value={1}>Beginner (1 Star)</option>
                        <option value={2}>Intermediate (2 Stars)</option>
                        <option value={3}>Advanced (3 Stars)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Max Participants
                      </label>
                      <input
                        type="number"
                        min="2"
                        max="100"
                        value={newSessionData.maxParticipants}
                        onChange={(e) => setNewSessionData(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) }))}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Duration (minutes)
                      </label>
                      <input
                        type="number"
                        min="5"
                        max="60"
                        value={newSessionData.duration}
                        onChange={(e) => setNewSessionData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={handleCreateSession}
                    disabled={isCreating}
                    className="w-full px-6 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl font-semibold text-lg shadow-card hover:shadow-soft transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    whileHover={!isCreating ? { scale: 1.02 } : {}}
                    whileTap={!isCreating ? { scale: 0.98 } : {}}
                  >
                    {isCreating && (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    )}
                    <span>{isCreating ? 'Creating Session...' : 'Create Session'}</span>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}