import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 flex items-center justify-center px-4">
      <motion.div
        className="text-center max-w-md mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        >
          <ApperIcon name="AlertTriangle" className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
        </motion.div>
        
        <h1 className="text-6xl sm:text-8xl font-bold text-gradient mb-4">404</h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white mb-4">
          Quest Not Found!
        </h2>
        <p className="text-lg text-surface-600 dark:text-surface-300 mb-8">
          Oops! It looks like this adventure doesn't exist. Let's get you back to learning!
        </p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-semibold text-lg shadow-card hover:shadow-soft transition-all duration-300"
          >
            <ApperIcon name="Home" className="w-5 h-5" />
            <span>Return Home</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}