import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

export default function ParentTeacherDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [filterPeriod, setFilterPeriod] = useState('week')
  const [filterSubject, setFilterSubject] = useState('all')
  const [filterDifficulty, setFilterDifficulty] = useState('all')
  const [sortBy, setSortBy] = useState('performance')
  const [isLoading, setIsLoading] = useState(true)
  
  // Assignment Creation State
  const [showAssignmentModal, setShowAssignmentModal] = useState(false)
  const [assignmentForm, setAssignmentForm] = useState({
    title: '',
    subject: 'math',
    concept: '',
    difficulty: 1,
    points: 10,
    dueDate: '',
    description: '',
    targetStudents: 'all'
  })
  
  // Communication State
  const [showCommunicationModal, setShowCommunicationModal] = useState(false)
  const [messageForm, setMessageForm] = useState({
    recipient: '',
    subject: '',
    message: '',
    type: 'message'
  })
  
  // Mock Data
  const [studentsData, setStudentsData] = useState([])
  const [assignments, setAssignments] = useState([])
  const [communications, setCommunications] = useState([])
  const [classroomStats, setClassroomStats] = useState({
    totalStudents: 0,
    averageProgress: 0,
    activeAssignments: 0,
    completionRate: 0
  })

  useEffect(() => {
    generateMockData()
  }, [filterPeriod, filterSubject, sortBy])

  const generateMockData = () => {
    setIsLoading(true)
    
    setTimeout(() => {
      const students = [
        {
          id: 1, name: 'Emma Johnson', avatar: '🦄', level: 5, 
          mathPoints: 450, sciencePoints: 380, totalPoints: 830,
          accuracy: 92, streak: 12, lastActive: '2 hours ago',
          weeklyProgress: 85, monthlyProgress: 78, overallProgress: 82,
          strongConcepts: ['Addition', 'Plant Life'], weakConcepts: ['Division', 'Weather'],
          assignments: { completed: 8, pending: 2, overdue: 0 }
        },
        {
          id: 2, name: 'Liam Smith', avatar: '🚀', level: 4,
          mathPoints: 320, sciencePoints: 290, totalPoints: 610,
          accuracy: 87, streak: 8, lastActive: '1 day ago',
          weeklyProgress: 72, monthlyProgress: 75, overallProgress: 73,
          strongConcepts: ['Subtraction', 'Animals'], weakConcepts: ['Multiplication', 'Solar System'],
          assignments: { completed: 6, pending: 3, overdue: 1 }
        },
        {
          id: 3, name: 'Olivia Brown', avatar: '⭐', level: 6,
          mathPoints: 520, sciencePoints: 440, totalPoints: 960,
          accuracy: 95, streak: 15, lastActive: '30 minutes ago',
          weeklyProgress: 95, monthlyProgress: 88, overallProgress: 91,
          strongConcepts: ['Fractions', 'Human Body'], weakConcepts: ['Geometry', 'Chemistry'],
          assignments: { completed: 9, pending: 1, overdue: 0 }
        },
        {
          id: 4, name: 'Noah Davis', avatar: '🎯', level: 3,
          mathPoints: 250, sciencePoints: 200, totalPoints: 450,
          accuracy: 79, streak: 5, lastActive: '3 hours ago',
          weeklyProgress: 65, monthlyProgress: 68, overallProgress: 67,
          strongConcepts: ['Counting', 'Earth Science'], weakConcepts: ['Word Problems', 'Physics'],
          assignments: { completed: 5, pending: 4, overdue: 2 }
        }
      ]
      
      const assignmentsList = [
        {
          id: 1, title: 'Addition Practice', subject: 'math', concept: 'Addition',
          difficulty: 1, points: 15, dueDate: '2024-01-25', status: 'active',
          assigned: 24, completed: 18, avgScore: 87
        },
        {
          id: 2, title: 'Plant Life Cycle', subject: 'science', concept: 'Biology',
          difficulty: 2, points: 20, dueDate: '2024-01-28', status: 'active',
          assigned: 24, completed: 12, avgScore: 82
        }
      ]
      
      const communicationsList = [
        {
          id: 1, type: 'message', from: 'Sarah Johnson (Emma\'s Mom)', 
          subject: 'Question about homework', date: '2024-01-20', unread: true
        },
        {
          id: 2, type: 'announcement', from: 'Teacher', 
          subject: 'Weekly Progress Update', date: '2024-01-19', unread: false
        }
      ]
      
      setStudentsData(students)
      setAssignments(assignmentsList)
      setCommunications(communicationsList)
      setClassroomStats({
        totalStudents: students.length,
        averageProgress: Math.round(students.reduce((acc, s) => acc + s.overallProgress, 0) / students.length),
        activeAssignments: assignmentsList.filter(a => a.status === 'active').length,
        completionRate: Math.round((assignmentsList.reduce((acc, a) => acc + a.completed, 0) / assignmentsList.reduce((acc, a) => acc + a.assigned, 0)) * 100)
      })
      setIsLoading(false)
    }, 1000)
  }

  const handleCreateAssignment = () => {
    if (!assignmentForm.title || !assignmentForm.concept || !assignmentForm.dueDate) {
      toast.error('Please fill in all required fields')
      return
    }
    
    const newAssignment = {
      id: assignments.length + 1,
      ...assignmentForm,
      status: 'active',
      assigned: studentsData.length,
      completed: 0,
      avgScore: 0
    }
    
    setAssignments([...assignments, newAssignment])
    setShowAssignmentModal(false)
    setAssignmentForm({
      title: '', subject: 'math', concept: '', difficulty: 1,
      points: 10, dueDate: '', description: '', targetStudents: 'all'
    })
    toast.success('Assignment created successfully!')
  }

  const handleSendMessage = () => {
    if (!messageForm.recipient || !messageForm.subject || !messageForm.message) {
      toast.error('Please fill in all required fields')
      return
    }
    
    const newCommunication = {
      id: communications.length + 1,
      type: messageForm.type,
      from: 'Teacher',
      subject: messageForm.subject,
      date: new Date().toISOString().split('T')[0],
      unread: false
    }
    
    setCommunications([newCommunication, ...communications])
    setShowCommunicationModal(false)
    setMessageForm({ recipient: '', subject: '', message: '', type: 'message' })
    toast.success('Message sent successfully!')
  }

  const handleDeleteAssignment = (assignmentId) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(assignments.filter(a => a.id !== assignmentId))
      toast.success('Assignment deleted successfully')
    }
  }

  const filteredAndSortedStudents = studentsData
    .filter(student => {
      if (filterSubject !== 'all') {
        const subjectPoints = filterSubject === 'math' ? student.mathPoints : student.sciencePoints
        return subjectPoints > 0
      }
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'performance':
          return b.overallProgress - a.overallProgress
        case 'points':
          return b.totalPoints - a.totalPoints
        case 'name':
          return a.name.localeCompare(b.name)
        case 'recent':
          return new Date(b.lastActive) - new Date(a.lastActive)
        default:
          return 0
      }
    })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-surface-600 dark:text-surface-400">Loading dashboard...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-4">
            📊 Parent/Teacher Dashboard
          </h1>
          <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
            Monitor student progress, create assignments, and communicate with families
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-100 dark:border-surface-700">
            <div className="flex items-center space-x-3 mb-2">
              <ApperIcon name="Users" className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium text-surface-600 dark:text-surface-400">Students</span>
            </div>
            <div className="text-3xl font-bold text-surface-900 dark:text-white">{classroomStats.totalStudents}</div>
          </div>
          
          <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-100 dark:border-surface-700">
            <div className="flex items-center space-x-3 mb-2">
              <ApperIcon name="TrendingUp" className="w-6 h-6 text-accent" />
              <span className="text-sm font-medium text-surface-600 dark:text-surface-400">Avg Progress</span>
            </div>
            <div className="text-3xl font-bold text-surface-900 dark:text-white">{classroomStats.averageProgress}%</div>
          </div>
          
          <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-100 dark:border-surface-700">
            <div className="flex items-center space-x-3 mb-2">
              <ApperIcon name="BookOpen" className="w-6 h-6 text-secondary" />
              <span className="text-sm font-medium text-surface-600 dark:text-surface-400">Active</span>
            </div>
            <div className="text-3xl font-bold text-surface-900 dark:text-white">{classroomStats.activeAssignments}</div>
          </div>
          
          <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-100 dark:border-surface-700">
            <div className="flex items-center space-x-3 mb-2">
              <ApperIcon name="CheckCircle" className="w-6 h-6 text-green-500" />
              <span className="text-sm font-medium text-surface-600 dark:text-surface-400">Complete</span>
            </div>
            <div className="text-3xl font-bold text-surface-900 dark:text-white">{classroomStats.completionRate}%</div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-100 dark:border-surface-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { id: 'overview', label: 'Overview', icon: 'BarChart3' },
              { id: 'students', label: 'Student Progress', icon: 'Users' },
              { id: 'assignments', label: 'Assignments', icon: 'BookOpen' },
              { id: 'communication', label: 'Communication', icon: 'MessageCircle' }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-card'
                    : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-700'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ApperIcon name={tab.icon} className="w-4 h-4" />
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
              className="px-3 py-2 rounded-lg border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white text-sm"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="semester">This Semester</option>
              <option value="year">This Year</option>
            </select>
            
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="px-3 py-2 rounded-lg border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white text-sm"
            >
              <option value="all">All Subjects</option>
              <option value="math">Math Only</option>
              <option value="science">Science Only</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white text-sm"
            >
              <option value="performance">By Performance</option>
              <option value="points">By Points</option>
              <option value="name">By Name</option>
              <option value="recent">By Activity</option>
            </select>
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Class Performance Chart */}
                <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-100 dark:border-surface-700">
                  <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-4">Class Performance Trends</h3>
                  <div className="space-y-4">
                    {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week, index) => (
                      <div key={week} className="flex items-center justify-between">
                        <span className="text-surface-600 dark:text-surface-400">{week}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-surface-200 dark:bg-surface-600 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
                              style={{ width: `${70 + index * 5}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-surface-900 dark:text-white">{70 + index * 5}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Performers */}
                <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-100 dark:border-surface-700">
                  <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-4">Top Performers</h3>
                  <div className="space-y-3">
                    {filteredAndSortedStudents.slice(0, 5).map((student, index) => (
                      <div key={student.id} className="flex items-center space-x-3">
                        <div className={`text-lg ${index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '⭐'}`}>
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '⭐'}
                        </div>
                        <div className="text-2xl">{student.avatar}</div>
                        <div className="flex-1">
                          <div className="font-medium text-surface-900 dark:text-white">{student.name}</div>
                          <div className="text-sm text-surface-600 dark:text-surface-400">{student.totalPoints} points</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'students' && (
            <motion.div
              key="students"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {filteredAndSortedStudents.map((student) => (
                <div key={student.id} className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-100 dark:border-surface-700">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                      <div className="text-3xl">{student.avatar}</div>
                      <div>
                        <h3 className="text-xl font-bold text-surface-900 dark:text-white">{student.name}</h3>
                        <div className="flex items-center space-x-3 text-sm text-surface-600 dark:text-surface-400">
                          <span>Level {student.level}</span>
                          <span>•</span>
                          <span>{student.accuracy}% accuracy</span>
                          <span>•</span>
                          <span>{student.streak} day streak</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-surface-900 dark:text-white">{student.totalPoints}</div>
                        <div className="text-xs text-surface-600 dark:text-surface-400">Total Points</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{student.mathPoints}</div>
                        <div className="text-xs text-surface-600 dark:text-surface-400">Math</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{student.sciencePoints}</div>
                        <div className="text-xs text-surface-600 dark:text-surface-400">Science</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-surface-900 dark:text-white">{student.overallProgress}%</div>
                        <div className="text-xs text-surface-600 dark:text-surface-400">Progress</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-surface-200 dark:border-surface-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-surface-900 dark:text-white mb-2">Strong Concepts</h4>
                        <div className="flex flex-wrap gap-2">
                          {student.strongConcepts.map((concept) => (
                            <span key={concept} className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-lg">{concept}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-surface-900 dark:text-white mb-2">Needs Practice</h4>
                        <div className="flex flex-wrap gap-2">
                          {student.weakConcepts.map((concept) => (
                            <span key={concept} className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs rounded-lg">{concept}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'assignments' && (
            <motion.div
              key="assignments"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-surface-900 dark:text-white">Assignments</h2>
                <motion.button
                  onClick={() => setShowAssignmentModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl font-semibold shadow-card hover:shadow-soft transition-all duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ApperIcon name="Plus" className="w-5 h-5" />
                  <span>Create Assignment</span>
                </motion.button>
              </div>
              
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border border-surface-100 dark:border-surface-700">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="mb-4 lg:mb-0">
                        <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-2">{assignment.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-surface-600 dark:text-surface-400">
                          <span className={`px-2 py-1 rounded-lg ${assignment.subject === 'math' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                            {assignment.subject.charAt(0).toUpperCase() + assignment.subject.slice(1)}
                          </span>
                          <span>{assignment.concept}</span>
                          <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                          <span>{assignment.points} points</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-surface-900 dark:text-white">{assignment.completed}/{assignment.assigned}</div>
                          <div className="text-xs text-surface-600 dark:text-surface-400">Completed</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-surface-900 dark:text-white">{assignment.avgScore}%</div>
                          <div className="text-xs text-surface-600 dark:text-surface-400">Avg Score</div>
                        </div>
                        <motion.button
                          onClick={() => handleDeleteAssignment(assignment.id)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ApperIcon name="Trash2" className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'communication' && (
            <motion.div
              key="communication"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-surface-900 dark:text-white">Communication</h2>
                <motion.button
                  onClick={() => setShowCommunicationModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-accent to-green-600 text-white rounded-2xl font-semibold shadow-card hover:shadow-soft transition-all duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ApperIcon name="Send" className="w-5 h-5" />
                  <span>Send Message</span>
                </motion.button>
              </div>
              
              <div className="space-y-4">
                {communications.map((comm) => (
                  <div key={comm.id} className={`bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card border ${
                    comm.unread ? 'border-primary' : 'border-surface-100 dark:border-surface-700'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`w-3 h-3 rounded-full mt-2 ${
                          comm.type === 'message' ? 'bg-blue-500' : 'bg-accent'
                        }`}></div>
                        <div>
                          <h3 className="font-semibold text-surface-900 dark:text-white">{comm.subject}</h3>
                          <p className="text-surface-600 dark:text-surface-400 text-sm mb-1">{comm.from}</p>
                          <p className="text-surface-500 dark:text-surface-500 text-xs">{comm.date}</p>
                        </div>
                      </div>
                      {comm.unread && (
                        <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-lg font-medium">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Assignment Creation Modal */}
        <AnimatePresence>
          {showAssignmentModal && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white dark:bg-surface-800 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-surface-900 dark:text-white">Create Assignment</h2>
                  <motion.button
                    onClick={() => setShowAssignmentModal(false)}
                    className="p-2 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ApperIcon name="X" className="w-6 h-6" />
                  </motion.button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Title *</label>
                    <input
                      type="text"
                      value={assignmentForm.title}
                      onChange={(e) => setAssignmentForm({...assignmentForm, title: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
                      placeholder="Enter assignment title"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Subject *</label>
                      <select
                        value={assignmentForm.subject}
                        onChange={(e) => setAssignmentForm({...assignmentForm, subject: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
                      >
                        <option value="math">Math</option>
                        <option value="science">Science</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Concept *</label>
                      <input
                        type="text"
                        value={assignmentForm.concept}
                        onChange={(e) => setAssignmentForm({...assignmentForm, concept: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
                        placeholder="e.g., Addition, Fractions"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Difficulty</label>
                      <select
                        value={assignmentForm.difficulty}
                        onChange={(e) => setAssignmentForm({...assignmentForm, difficulty: parseInt(e.target.value)})}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
                      >
                        <option value={1}>Easy (1 ⭐)</option>
                        <option value={2}>Medium (2 ⭐)</option>
                        <option value={3}>Hard (3 ⭐)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Points</label>
                      <input
                        type="number"
                        value={assignmentForm.points}
                        onChange={(e) => setAssignmentForm({...assignmentForm, points: parseInt(e.target.value)})}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
                        min="5"
                        max="100"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Due Date *</label>
                      <input
                        type="date"
                        value={assignmentForm.dueDate}
                        onChange={(e) => setAssignmentForm({...assignmentForm, dueDate: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Description</label>
                    <textarea
                      value={assignmentForm.description}
                      onChange={(e) => setAssignmentForm({...assignmentForm, description: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
                      rows="3"
                      placeholder="Assignment instructions and details"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-4 mt-8">
                  <motion.button
                    onClick={() => setShowAssignmentModal(false)}
                    className="flex-1 px-6 py-3 border border-surface-200 dark:border-surface-600 text-surface-600 dark:text-surface-400 rounded-2xl font-semibold hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={handleCreateAssignment}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl font-semibold shadow-card hover:shadow-soft transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Create Assignment
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Communication Modal */}
        <AnimatePresence>
          {showCommunicationModal && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white dark:bg-surface-800 rounded-3xl p-8 max-w-2xl w-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-surface-900 dark:text-white">Send Message</h2>
                  <motion.button
                    onClick={() => setShowCommunicationModal(false)}
                    className="p-2 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ApperIcon name="X" className="w-6 h-6" />
                  </motion.button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Type</label>
                      <select
                        value={messageForm.type}
                        onChange={(e) => setMessageForm({...messageForm, type: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
                      >
                        <option value="message">Direct Message</option>
                        <option value="announcement">Class Announcement</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Recipient *</label>
                      <input
                        type="text"
                        value={messageForm.recipient}
                        onChange={(e) => setMessageForm({...messageForm, recipient: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
                        placeholder="Parent name or 'All Parents'"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Subject *</label>
                    <input
                      type="text"
                      value={messageForm.subject}
                      onChange={(e) => setMessageForm({...messageForm, subject: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
                      placeholder="Message subject"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Message *</label>
                    <textarea
                      value={messageForm.message}
                      onChange={(e) => setMessageForm({...messageForm, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
                      rows="5"
                      placeholder="Type your message here..."
                    />
                  </div>
                </div>
                
                <div className="flex space-x-4 mt-8">
                  <motion.button
                    onClick={() => setShowCommunicationModal(false)}
                    className="flex-1 px-6 py-3 border border-surface-200 dark:border-surface-600 text-surface-600 dark:text-surface-400 rounded-2xl font-semibold hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={handleSendMessage}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-accent to-green-600 text-white rounded-2xl font-semibold shadow-card hover:shadow-soft transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
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