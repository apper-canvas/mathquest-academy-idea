import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

export default function MainFeature() {
  const [currentProblem, setCurrentProblem] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [showResult, setShowResult] = useState(false)
  const [multiplayerSession, setMultiplayerSession] = useState(null)
  const [activeParticipants, setActiveParticipants] = useState(0)
  const [userProgress, setUserProgress] = useState({
    mathPoints: 0,
    sciencePoints: 0,
    totalProblems: 0,
    correctAnswers: 0
  })

  const problems = [
    {
      id: 1,
      subject: "Math",
      question: "What is 15 + 8?",
      options: ["21", "23", "25", "27"],
      correctAnswer: 1,
      difficulty: 1,
      points: 10,
      explanation: "15 + 8 = 23. Great job adding two-digit numbers!"
    },
    {
      id: 2,
      subject: "Science",
      question: "What do plants need to make their own food?",
      options: ["Water only", "Sunlight and water", "Soil only", "Air only"],
      correctAnswer: 1,
      difficulty: 1,
      points: 10,
      explanation: "Plants need sunlight and water for photosynthesis to make their own food!"
    },
    {
      id: 3,
      subject: "Math",
      question: "If you have 24 cookies and share them equally among 6 friends, how many cookies does each friend get?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1,
      difficulty: 2,
      points: 15,
      explanation: "24 ÷ 6 = 4. Each friend gets 4 cookies when shared equally!"
    },
    {
      id: 4,
      subject: "Science",
      question: "What happens to water when it gets very cold?",
      options: ["It becomes gas", "It freezes into ice", "It disappears", "It becomes hot"],
      correctAnswer: 1,
      difficulty: 1,
      points: 10,
      explanation: "When water gets very cold (0°C or 32°F), it freezes and becomes ice!"
    }
  ]

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      toast.error("Please select an answer before submitting!")
      return
    }

    const problem = problems[currentProblem]
    const isCorrect = selectedAnswer === problem.correctAnswer
    
    setShowResult(true)
    
    if (isCorrect) {
      const newScore = score + problem.points
      setScore(newScore)
      
      // Update progress based on subject
      const newProgress = { ...userProgress }
      newProgress.totalProblems += 1
      newProgress.correctAnswers += 1
      
      if (problem.subject === "Math") {
        newProgress.mathPoints += problem.points
      } else {
        newProgress.sciencePoints += problem.points
      }
      
      setUserProgress(newProgress)
      
      // Level up every 50 points
      if (newScore >= level * 50) {
        setLevel(level + 1)
        toast.success(`🎉 Level Up! You're now level ${level + 1}!`, {
          autoClose: 4000,
        })
      } else {
        toast.success("🌟 Correct! Well done!", {
          autoClose: 2000,
        })
      }
    } else {
      setUserProgress(prev => ({
        ...prev,
        totalProblems: prev.totalProblems + 1
      }))
      toast.error("Not quite right. Try again!", {
        autoClose: 2000,
      })
    }
  }

  const handleNextProblem = () => {
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(currentProblem + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      // Reset to beginning for demo
      setCurrentProblem(0)
      setSelectedAnswer(null)
      setShowResult(false)
      toast.success("🎯 Great job! Starting over with new challenges!")
    }
  }

  const problem = problems[currentProblem]
  const accuracy = userProgress.totalProblems > 0 ? Math.round((userProgress.correctAnswers / userProgress.totalProblems) * 100) : 0

  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-surface-900 dark:text-white mb-4">
            Interactive Learning Challenge
          </h3>
          <p className="text-lg sm:text-xl text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
            Test your skills with our adaptive problem-solving system

          {/* Multiplayer Session Indicator */}
          {multiplayerSession && (
            <motion.div
              className="bg-accent/10 border border-accent/30 rounded-2xl p-4 mb-8 flex items-center justify-between"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                <span className="font-medium text-accent">Multiplayer Session Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Users" className="w-5 h-5 text-accent" />
                <span className="text-accent font-semibold">{activeParticipants} players online</span>
              </div>
            </motion.div>
          )}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Dashboard */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-surface-800 rounded-2xl p-4 sm:p-6 shadow-card border border-surface-100 dark:border-surface-700">
              <div className="flex items-center space-x-2 mb-2">
                <ApperIcon name="Trophy" className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium text-surface-600 dark:text-surface-400">Level</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gradient">{level}</div>
            </div>
            
            <div className="bg-white dark:bg-surface-800 rounded-2xl p-4 sm:p-6 shadow-card border border-surface-100 dark:border-surface-700">
              <div className="flex items-center space-x-2 mb-2">
                <ApperIcon name="Star" className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium text-surface-600 dark:text-surface-400">Score</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white">{score}</div>
            </div>
            
            <div className="bg-white dark:bg-surface-800 rounded-2xl p-4 sm:p-6 shadow-card border border-surface-100 dark:border-surface-700">
              <div className="flex items-center space-x-2 mb-2">
                <ApperIcon name="Target" className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-surface-600 dark:text-surface-400">Accuracy</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white">{accuracy}%</div>
            </div>
            
            <div className="bg-white dark:bg-surface-800 rounded-2xl p-4 sm:p-6 shadow-card border border-surface-100 dark:border-surface-700">
              <div className="flex items-center space-x-2 mb-2">
                <ApperIcon name="BookOpen" className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium text-surface-600 dark:text-surface-400">Problems</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white">{userProgress.totalProblems}</div>
            </div>
          </motion.div>

          {/* Problem Card */}
          <motion.div
            className="bg-white dark:bg-surface-800 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-card border border-surface-100 dark:border-surface-700"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Problem Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
              <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                <div className={`w-3 h-3 rounded-full ${problem.subject === 'Math' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                <span className="text-sm font-medium text-surface-600 dark:text-surface-400 uppercase tracking-wide">
                  {problem.subject}
                </span>
                <div className="flex items-center space-x-1">
                  {[...Array(problem.difficulty)].map((_, i) => (
                    <ApperIcon key={i} name="Star" className="w-4 h-4 text-secondary" />
                  ))}
                </div>
              </div>
              <div className="text-sm text-surface-500 dark:text-surface-400">
                Question {currentProblem + 1} of {problems.length}
              </div>
            </div>

            {/* Question */}
            <motion.div
              key={currentProblem}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-surface-900 dark:text-white mb-6 sm:mb-8 leading-relaxed">
                {problem.question}
              </h4>

              {/* Answer Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {problem.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => !showResult && handleAnswerSelect(index)}
                    className={`p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 text-left group ${
                      selectedAnswer === index
                        ? showResult
                          ? index === problem.correctAnswer
                            ? 'border-accent bg-accent/10 text-accent'
                            : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                          : 'border-primary bg-primary/10 text-primary'
                        : showResult && index === problem.correctAnswer
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-surface-200 dark:border-surface-600 hover:border-primary hover:bg-primary/5 text-surface-700 dark:text-surface-300'
                    } ${showResult ? 'cursor-default' : 'cursor-pointer hover:scale-105'}`}
                    disabled={showResult}
                    whileHover={!showResult ? { scale: 1.02 } : {}}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                        selectedAnswer === index
                          ? showResult
                            ? index === problem.correctAnswer
                              ? 'border-accent bg-accent text-white'
                              : 'border-red-500 bg-red-500 text-white'
                            : 'border-primary bg-primary text-white'
                          : showResult && index === problem.correctAnswer
                          ? 'border-accent bg-accent text-white'
                          : 'border-current'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-sm sm:text-base font-medium">{option}</span>
                      {showResult && index === problem.correctAnswer && (
                        <ApperIcon name="Check" className="w-5 h-5 text-accent ml-auto" />
                      )}
                      {showResult && selectedAnswer === index && index !== problem.correctAnswer && (
                        <ApperIcon name="X" className="w-5 h-5 text-red-500 ml-auto" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Result and Explanation */}
              <AnimatePresence>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 sm:mb-8 p-4 sm:p-6 bg-surface-50 dark:bg-surface-700 rounded-2xl"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        selectedAnswer === problem.correctAnswer ? 'bg-accent' : 'bg-surface-400'
                      }`}>
                        <ApperIcon 
                          name={selectedAnswer === problem.correctAnswer ? "Check" : "BookOpen"} 
                          className="w-5 h-5 text-white" 
                        />
                      </div>
                      <div>
                        <h5 className="font-semibold text-surface-900 dark:text-white mb-2">
                          {selectedAnswer === problem.correctAnswer ? "Excellent!" : "Good try!"}
                        </h5>
                        <p className="text-surface-600 dark:text-surface-300 text-sm sm:text-base">
                          {problem.explanation}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {!showResult ? (
                  <motion.button
                    onClick={handleSubmitAnswer}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl font-semibold text-lg shadow-card hover:shadow-soft transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={selectedAnswer === null}
                    whileHover={{ scale: selectedAnswer !== null ? 1.02 : 1 }}
                    whileTap={{ scale: selectedAnswer !== null ? 0.98 : 1 }}
                  >
                    Submit Answer
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleNextProblem}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-accent to-green-600 text-white rounded-2xl font-semibold text-lg shadow-card hover:shadow-soft transition-all duration-300 flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>
                      {currentProblem < problems.length - 1 ? "Next Question" : "Start Over"}
                    </span>
                    <ApperIcon name="ArrowRight" className="w-5 h-5" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}