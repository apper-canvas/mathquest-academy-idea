import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="relative z-50 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="Zap" className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gradient">MathQuest Academy</h1>
            </motion.div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <motion.button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ApperIcon 
                  name={darkMode ? "Sun" : "Moon"} 
                  className="w-5 h-5 text-surface-600 dark:text-surface-400" 
                />
              </motion.button>
              <motion.button
                className="px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-accent to-green-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 text-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/multiplayer'}
              >
                <span className="hidden sm:inline">Multiplayer</span>
                <span className="sm:hidden">MP</span>
              </motion.button>
              
              <motion.button
                className="px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 text-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/leaderboard'}
              >
                <span className="hidden sm:inline">Leaderboard</span>
                <span className="sm:hidden">LB</span>
              </motion.button>
              
              <motion.button
                className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="hidden sm:inline">Start Learning</span>
                <span className="sm:hidden">Start</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-16 lg:pt-24 pb-8 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-surface-900 dark:text-white mb-4 sm:mb-6">
                Learn Math & Science
                <span className="block text-gradient">Through Adventure!</span>
              </h2>
              <p className="text-lg sm:text-xl text-surface-600 dark:text-surface-300 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
                Join thousands of kids aged 6-12 on an epic learning journey. Solve puzzles, earn rewards, and master essential skills in a magical world of discovery.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
                <motion.button
                  className="px-6 py-4 sm:px-8 sm:py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-semibold text-lg shadow-card hover:shadow-soft transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/multiplayer'}
                >
                  Start Your Quest
                </motion.button>
                <motion.button
                  className="px-6 py-4 sm:px-8 sm:py-4 bg-white dark:bg-surface-800 text-surface-900 dark:text-white rounded-2xl font-semibold text-lg shadow-card hover:shadow-soft transition-all duration-300 border border-surface-200 dark:border-surface-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Watch Demo
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div
              className="relative mt-8 lg:mt-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative w-full max-w-md mx-auto lg:max-w-full">
                <img 
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Kids learning with technology"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-3xl shadow-card"
                />
                <div className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 bg-accent rounded-2xl flex items-center justify-center shadow-card pulse-glow">
                  <ApperIcon name="Star" className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-8 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-surface-900 dark:text-white mb-4">
              Why Kids Love MathQuest
            </h3>
            <p className="text-lg sm:text-xl text-surface-600 dark:text-surface-300 max-w-3xl mx-auto">
              Discover the magic of learning through our innovative gamification approach
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: "Gamepad2",
                title: "Interactive Games",
                description: "Transform learning into exciting adventures with drag-and-drop puzzles and interactive challenges"
              },
              {
                icon: "Trophy",
                title: "Rewards & Badges",
                description: "Earn points, unlock achievements, and customize your avatar as you progress through levels"
              },
              {
                icon: "Brain",
                title: "Adaptive Learning",
                description: "Smart difficulty adjustment that grows with your child's skills and learning pace"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group p-6 sm:p-8 bg-white dark:bg-surface-800 rounded-3xl shadow-card hover:shadow-soft transition-all duration-300 border border-surface-100 dark:border-surface-700"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ApperIcon name={feature.icon} className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-surface-900 dark:text-white mb-2 sm:mb-3">
                  {feature.title}
                </h4>
                <p className="text-surface-600 dark:text-surface-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Interactive Feature */}
      <MainFeature />

      {/* Footer */}
      <footer className="bg-surface-900 dark:bg-surface-950 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="Zap" className="w-5 h-5 text-white" />
              </div>
              <h5 className="text-xl font-bold">MathQuest Academy</h5>
            </div>
            <p className="text-surface-400 text-sm sm:text-base">
              Making learning fun and engaging for children worldwide
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}