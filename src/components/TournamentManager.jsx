import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

export default function TournamentManager() {
  const [activeTab, setActiveTab] = useState('browse')
  const [tournaments, setTournaments] = useState([])
  const [myTournaments, setMyTournaments] = useState([])
  const [isCreating, setIsCreating] = useState(false)
  const [selectedTournament, setSelectedTournament] = useState(null)
  const [newTournamentData, setNewTournamentData] = useState({
    title: '',
    description: '',
    subject: 'Math',
    difficulty: 1,
    maxParticipants: 64,
    startDate: '',
    duration: 30,
    prizePool: 'Badges and Certificates'
  })

  // Mock data
  useEffect(() => {
    const mockTournaments = [
      {
        id: 'tour_001',
        title: 'Spring Math Championship',
        description: 'Annual math competition for grades 3-5',
        subject: 'Math',
        difficulty: 2,
        participants: 42,
        maxParticipants: 64,
        status: 'open',
        startDate: '2024-03-15',
        duration: 45,
        prizePool: 'Trophies, Medals, and Certificates',
        organizer: 'MathQuest Academy',
        registrationDeadline: '2024-03-10',
        format: 'Single Elimination',
        rounds: 6
      },
      {
        id: 'tour_002',
        title: 'Science Explorers Tournament',
        description: 'Discover the wonders of science through challenges',
        subject: 'Science',
        difficulty: 1,
        participants: 28,
        maxParticipants: 32,
        status: 'active',
        startDate: '2024-02-20',
        duration: 30,
        prizePool: 'Science Kits and Badges',
        organizer: 'ScienceHub',
        registrationDeadline: '2024-02-15',
        format: 'Round Robin',
        rounds: 4
      },
      {
        id: 'tour_003',
        title: 'Quick Math Blitz',
        description: 'Fast-paced math challenges for quick thinkers',
        subject: 'Math',
        difficulty: 3,
        participants: 16,
        maxParticipants: 16,
        status: 'completed',
        startDate: '2024-01-30',
        duration: 15,
        prizePool: 'Digital Badges',
        organizer: 'Lightning Math',
        registrationDeadline: '2024-01-25',
        format: 'Speed Round',
        rounds: 3
      }
    ]
    
    const mockMyTournaments = [
      {
        ...mockTournaments[1],
        myRank: 5,
        myScore: 850,
        nextMatch: '2024-02-22T14:00:00Z'
      }
    ]
    
    setTournaments(mockTournaments)
    setMyTournaments(mockMyTournaments)
  }, [])

  const handleJoinTournament = (tournamentId) => {
    const tournament = tournaments.find(t => t.id === tournamentId)
    if (tournament) {
      if (tournament.participants >= tournament.maxParticipants) {
        toast.error('Tournament is full!')
        return
      }
      
      if (tournament.status !== 'open') {
        toast.error('Registration is closed for this tournament')
        return
      }
      
      // Update tournament participants
      setTournaments(prev => prev.map(t => 
        t.id === tournamentId 
          ? { ...t, participants: t.participants + 1 }
          : t
      ))
      
      // Add to user's tournaments
      setMyTournaments(prev => [...prev, {
        ...tournament,
        participants: tournament.participants + 1,
        myRank: null,
        myScore: 0,
        nextMatch: null
      }])
      
      toast.success(`Successfully registered for ${tournament.title}!`)
    }
  }

  const handleCreateTournament = () => {
    if (!newTournamentData.title.trim() || !newTournamentData.startDate) {
      toast.error('Please fill in all required fields!')
      return
    }
    
    setIsCreating(true)
    
    setTimeout(() => {
      const newTournament = {
        id: `tour_${Date.now()}`,
        ...newTournamentData,
        participants: 1,
        status: 'open',
        organizer: 'You',
        registrationDeadline: newTournamentData.startDate,
        format: newTournamentData.maxParticipants <= 16 ? 'Single Elimination' : 'Multiple Rounds',
        rounds: Math.ceil(Math.log2(newTournamentData.maxParticipants))
      }
      
      setTournaments(prev => [newTournament, ...prev])
      setMyTournaments(prev => [{
        ...newTournament,
        myRank: null,
        myScore: 0,
        nextMatch: null
      }, ...prev])
      
      setIsCreating(false)
      toast.success(`Tournament "${newTournament.title}" created successfully!`)
      
      // Reset form
      setNewTournamentData({
        title: '',
        description: '',
        subject: 'Math',
        difficulty: 1,
        maxParticipants: 64,
        startDate: '',
        duration: 30,
        prizePool: 'Badges and Certificates'
      })
    }, 2000)
  }

  const handleLeaveTournament = (tournamentId) => {
    setMyTournaments(prev => prev.filter(t => t.id !== tournamentId))
    setTournaments(prev => prev.map(t => 
      t.id === tournamentId 
        ? { ...t, participants: Math.max(0, t.participants - 1) }
        : t
    ))
    toast.info('Left the tournament')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'text-green-600 bg-green-100'
      case 'active': return 'text-blue-600 bg-blue-100'
      case 'completed': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open': return 'Calendar'
      case 'active': return 'Play'
      case 'completed': return 'CheckCircle'
      default: return 'Clock'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
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
            🏆 Tournaments
          </h1>
          <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
            Compete in large-scale competitions and prove your skills
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-surface-800 rounded-2xl p-2 shadow-card border border-surface-100 dark:border-surface-700">
            <div className="flex space-x-2">
              {[
                { id: 'browse', label: 'Browse Tournaments', icon: 'Search' },
                { id: 'my', label: 'My Tournaments', icon: 'User' },
                { id: 'create', label: 'Create Tournament', icon: 'Plus' }
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
          {/* Browse Tournaments */}
          {activeTab === 'browse' && (
            <motion.div
              key="browse"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-6xl mx-auto"
            >
              <div className="grid gap-6">
                {tournaments.map((tournament, index) => (
                  <motion.div
                    key={tournament.id}
                    className="bg-white dark:bg-surface-800 rounded-3xl p-6 sm:p-8 shadow-card border border-surface-100 dark:border-surface-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-white">
                            {tournament.title}
                          </h3>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(tournament.status)}`}>
                            <div className="flex items-center space-x-1">
                              <ApperIcon name={getStatusIcon(tournament.status)} className="w-4 h-4" />
                              <span className="capitalize">{tournament.status}</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-surface-600 dark:text-surface-400 mb-4">
                          {tournament.description}
                        </p>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center space-x-2 text-sm text-surface-600 dark:text-surface-400">
                            <ApperIcon name="BookOpen" className="w-4 h-4" />
                            <span>{tournament.subject}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-surface-600 dark:text-surface-400">
                            <ApperIcon name="Users" className="w-4 h-4" />
                            <span>{tournament.participants}/{tournament.maxParticipants}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-surface-600 dark:text-surface-400">
                            <ApperIcon name="Calendar" className="w-4 h-4" />
                            <span>{formatDate(tournament.startDate)}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-surface-600 dark:text-surface-400">
                            <ApperIcon name="Clock" className="w-4 h-4" />
                            <span>{tournament.duration}min</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            {[...Array(tournament.difficulty)].map((_, i) => (
                              <ApperIcon key={i} name="Star" className="w-4 h-4 text-secondary" />
                            ))}
                          </div>
                          <span className="text-surface-600 dark:text-surface-400">
                            Prize: {tournament.prizePool}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-6 lg:mt-0 lg:ml-8 flex flex-col space-y-3">
                        <motion.button
                          onClick={() => handleJoinTournament(tournament.id)}
                          disabled={tournament.status !== 'open' || tournament.participants >= tournament.maxParticipants}
                          className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          whileHover={tournament.status === 'open' && tournament.participants < tournament.maxParticipants ? { scale: 1.05 } : {}}
                          whileTap={tournament.status === 'open' && tournament.participants < tournament.maxParticipants ? { scale: 0.95 } : {}}
                        >
                          {tournament.status !== 'open' ? 'Registration Closed' :
                           tournament.participants >= tournament.maxParticipants ? 'Tournament Full' :
                           'Join Tournament'}
                        </motion.button>
                        
                        <motion.button
                          onClick={() => setSelectedTournament(tournament)}
                          className="px-6 py-3 bg-white dark:bg-surface-700 text-surface-900 dark:text-white rounded-2xl font-semibold border border-surface-200 dark:border-surface-600 hover:shadow-lg transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Details
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* My Tournaments */}
          {activeTab === 'my' && (
            <motion.div
              key="my"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              {myTournaments.length === 0 ? (
                <div className="bg-white dark:bg-surface-800 rounded-3xl p-8 shadow-card border border-surface-100 dark:border-surface-700 text-center">
                  <div className="w-16 h-16 bg-surface-100 dark:bg-surface-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="Trophy" className="w-8 h-8 text-surface-400" />
                  </div>
                  <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-2">
                    No tournaments yet
                  </h3>
                  <p className="text-surface-600 dark:text-surface-400 mb-6">
                    Join your first tournament to start competing!
                  </p>
                  <motion.button
                    onClick={() => setActiveTab('browse')}
                    className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Browse Tournaments
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-6">
                  {myTournaments.map((tournament, index) => (
                    <motion.div
                      key={tournament.id}
                      className="bg-white dark:bg-surface-800 rounded-3xl p-6 sm:p-8 shadow-card border border-surface-100 dark:border-surface-700"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="text-xl font-bold text-surface-900 dark:text-white">
                              {tournament.title}
                            </h3>
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(tournament.status)}`}>
                              {tournament.status}
                            </div>
                          </div>
                          
                          {tournament.myRank && (
                            <div className="mb-4">
                              <div className="flex items-center space-x-4">
                                <div className="text-2xl font-bold text-primary">
                                  Rank #{tournament.myRank}
                                </div>
                                <div className="text-surface-600 dark:text-surface-400">
                                  Score: {tournament.myScore}
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {tournament.nextMatch && (
                            <div className="mb-4 p-3 bg-accent/10 rounded-lg">
                              <div className="flex items-center space-x-2 text-accent">
                                <ApperIcon name="Clock" className="w-4 h-4" />
                                <span className="font-medium">
                                  Next match: {new Date(tournament.nextMatch).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          )}
                          
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <div className="text-center p-3 bg-surface-50 dark:bg-surface-700 rounded-lg">
                              <div className="text-lg font-bold text-surface-900 dark:text-white">
                                {tournament.participants}
                              </div>
                              <div className="text-sm text-surface-600 dark:text-surface-400">Participants</div>
                            </div>
                            <div className="text-center p-3 bg-surface-50 dark:bg-surface-700 rounded-lg">
                              <div className="text-lg font-bold text-surface-900 dark:text-white">
                                {tournament.rounds}
                              </div>
                              <div className="text-sm text-surface-600 dark:text-surface-400">Rounds</div>
                            </div>
                            <div className="text-center p-3 bg-surface-50 dark:bg-surface-700 rounded-lg">
                              <div className="text-lg font-bold text-surface-900 dark:text-white">
                                {tournament.format}
                              </div>
                              <div className="text-sm text-surface-600 dark:text-surface-400">Format</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 lg:mt-0 lg:ml-8 flex flex-col space-y-3">
                          {tournament.status === 'active' && tournament.nextMatch && (
                            <motion.button
                              className="px-6 py-3 bg-gradient-to-r from-accent to-green-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => toast.success('Joining match...')}
                            >
                              Join Match
                            </motion.button>
                          )}
                          
                          <motion.button
                            onClick={() => handleLeaveTournament(tournament.id)}
                            className="px-6 py-3 bg-red-500 text-white rounded-2xl font-semibold hover:bg-red-600 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Leave Tournament
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Create Tournament */}
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
                <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-6">
                  Create New Tournament
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Tournament Title *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Summer Math Championship"
                      value={newTournamentData.title}
                      onChange={(e) => setNewTournamentData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Description
                    </label>
                    <textarea
                      placeholder="Describe your tournament..."
                      value={newTournamentData.description}
                      onChange={(e) => setNewTournamentData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Subject
                      </label>
                      <select
                        value={newTournamentData.subject}
                        onChange={(e) => setNewTournamentData(prev => ({ ...prev, subject: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      >
                        <option value="Math">Math</option>
                        <option value="Science">Science</option>
                        <option value="Mixed">Mixed</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Difficulty
                      </label>
                      <select
                        value={newTournamentData.difficulty}
                        onChange={(e) => setNewTournamentData(prev => ({ ...prev, difficulty: parseInt(e.target.value) }))}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      >
                        <option value={1}>Beginner</option>
                        <option value={2}>Intermediate</option>
                        <option value={3}>Advanced</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Max Participants
                      </label>
                      <select
                        value={newTournamentData.maxParticipants}
                        onChange={(e) => setNewTournamentData(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) }))}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      >
                        <option value={8}>8 Players</option>
                        <option value={16}>16 Players</option>
                        <option value={32}>32 Players</option>
                        <option value={64}>64 Players</option>
                        <option value={128}>128 Players</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Duration (minutes)
                      </label>
                      <input
                        type="number"
                        min="15"
                        max="120"
                        value={newTournamentData.duration}
                        onChange={(e) => setNewTournamentData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={newTournamentData.startDate}
                      onChange={(e) => setNewTournamentData(prev => ({ ...prev, startDate: e.target.value }))}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Prize Pool
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Trophies and Certificates"
                      value={newTournamentData.prizePool}
                      onChange={(e) => setNewTournamentData(prev => ({ ...prev, prizePool: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                  
                  <motion.button
                    onClick={handleCreateTournament}
                    disabled={isCreating}
                    className="w-full px-6 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl font-semibold text-lg shadow-card hover:shadow-soft transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    whileHover={!isCreating ? { scale: 1.02 } : {}}
                    whileTap={!isCreating ? { scale: 0.98 } : {}}
                  >
                    {isCreating && (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    )}
                    <span>{isCreating ? 'Creating Tournament...' : 'Create Tournament'}</span>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tournament Details Modal */}
        <AnimatePresence>
          {selectedTournament && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTournament(null)}
            >
              <motion.div
                className="bg-white dark:bg-surface-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-surface-900 dark:text-white">
                    {selectedTournament.title}
                  </h3>
                  <motion.button
                    onClick={() => setSelectedTournament(null)}
                    className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ApperIcon name="X" className="w-6 h-6 text-surface-600 dark:text-surface-400" />
                  </motion.button>
                </div>
                
                <div className="space-y-6">
                  <p className="text-surface-600 dark:text-surface-400">
                    {selectedTournament.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-surface-50 dark:bg-surface-700 rounded-xl">
                      <div className="text-2xl font-bold text-surface-900 dark:text-white">
                        {selectedTournament.participants}/{selectedTournament.maxParticipants}
                      </div>
                      <div className="text-sm text-surface-600 dark:text-surface-400">Participants</div>
                    </div>
                    <div className="text-center p-4 bg-surface-50 dark:bg-surface-700 rounded-xl">
                      <div className="text-2xl font-bold text-surface-900 dark:text-white">
                        {selectedTournament.rounds}
                      </div>
                      <div className="text-sm text-surface-600 dark:text-surface-400">Rounds</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-surface-700 dark:text-surface-300">Format:</span>
                      <span className="text-surface-600 dark:text-surface-400">{selectedTournament.format}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-surface-700 dark:text-surface-300">Prize Pool:</span>
                      <span className="text-surface-600 dark:text-surface-400">{selectedTournament.prizePool}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-surface-700 dark:text-surface-300">Organizer:</span>
                      <span className="text-surface-600 dark:text-surface-400">{selectedTournament.organizer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-surface-700 dark:text-surface-300">Registration Deadline:</span>
                      <span className="text-surface-600 dark:text-surface-400">{formatDate(selectedTournament.registrationDeadline)}</span>
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={() => {
                      handleJoinTournament(selectedTournament.id)
                      setSelectedTournament(null)
                    }}
                    disabled={selectedTournament.status !== 'open' || selectedTournament.participants >= selectedTournament.maxParticipants}
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={selectedTournament.status === 'open' && selectedTournament.participants < selectedTournament.maxParticipants ? { scale: 1.02 } : {}}
                    whileTap={selectedTournament.status === 'open' && selectedTournament.participants < selectedTournament.maxParticipants ? { scale: 0.98 } : {}}
                  >
                    {selectedTournament.status !== 'open' ? 'Registration Closed' :
                     selectedTournament.participants >= selectedTournament.maxParticipants ? 'Tournament Full' :
                     'Join Tournament'}
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
