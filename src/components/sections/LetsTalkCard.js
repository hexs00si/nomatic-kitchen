// Implement the Emailservice using sendgrid 
// Change the background to maintain UI consistency as well 

"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight, MessageCircle } from "lucide-react"

export default function LetsTalkCard() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [isTyping, setIsTyping] = useState(false)

  // Enhanced typewriter effect with looping
  useEffect(() => {
    const fullText = "Let's Talk"
    let typewriterInterval
    let cursorInterval
    let loopTimeout

    const startTypewriter = () => {
      setIsTyping(true)
      let index = 0
      
      typewriterInterval = setInterval(() => {
        if (index <= fullText.length) {
          setDisplayText(fullText.slice(0, index))
          index++
        } else {
          clearInterval(typewriterInterval)
          setIsTyping(false)
          
          // Wait 3 seconds then restart the animation
          loopTimeout = setTimeout(() => {
            setDisplayText("")
            startTypewriter()
          }, 3000)
        }
      }, 150)
    }

    // Cursor blinking effect
    cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    // Start the typewriter effect after initial delay
    const initialDelay = setTimeout(startTypewriter, 1000)

    return () => {
      clearInterval(typewriterInterval)
      clearInterval(cursorInterval)
      clearTimeout(loopTimeout)
      clearTimeout(initialDelay)
    }
  }, [])

  const validateForm = () => {
    const newErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    } else if (!/^[A-Za-z\s.'-]+$/.test(formData.name.trim())) {
      newErrors.name = "Name contains invalid characters"
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address"
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number"
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Form submitted:", formData)
      setFormData({ name: "", email: "", phone: "", message: "" })
      setErrors({})
      alert("Message sent successfully!")
    } catch (error) {
      console.error("Form submission error:", error)
      alert("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field, value) => {
    // Special handling for phone number (only allow digits)
    if (field === 'phone') {
      const digitsOnly = value.replace(/\D/g, '')
      if (digitsOnly.length <= 10) {
        setFormData((prev) => ({ ...prev, [field]: digitsOnly }))
      }
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-6xl"
      >
        {/* Enhanced card with improved red border animation */}
        <div className="relative rounded-3xl p-1 shadow-2xl">
          {/* Animated border with consistent red theme */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[#EB1B26] via-[#FF4757] to-[#EB1B26] rounded-3xl opacity-75 blur-sm"
            animate={{ 
              background: [
                "linear-gradient(0deg, #EB1B26, #FF4757, #EB1B26)",
                "linear-gradient(90deg, #EB1B26, #FF4757, #EB1B26)",
                "linear-gradient(180deg, #EB1B26, #FF4757, #EB1B26)",
                "linear-gradient(270deg, #EB1B26, #FF4757, #EB1B26)",
                "linear-gradient(360deg, #EB1B26, #FF4757, #EB1B26)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          {/* Main card with improved gradient */}
          <div 
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #383838 0%, #1F1E1E 100%)'
            }}
          >
            <div className="grid lg:grid-cols-2 min-h-[600px]">
              {/* Left Section - Enhanced Branding */}
              <div className="p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div 
                    className="w-full h-full" 
                    style={{
                      backgroundImage: `radial-gradient(circle at 25% 25%, #EB1B26 2px, transparent 2px)`,
                      backgroundSize: '40px 40px'
                    }}
                  />
                </div>

                <div className="relative z-10">
                  <motion.h1
                    className="text-2xl lg:text-3xl font-light text-white mb-2"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Get in Touch with{" "}
                    <span className="font-semibold text-[#EB1B26]">Nomatic.</span>
                  </motion.h1>
                </div>

                <div className="relative z-10">
                  <motion.p
                    className="text-gray-300 text-lg font-light mb-8"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    Your perfect space starts here.
                  </motion.p>

                  {/* Enhanced responsive "Let's Talk" with proper line handling */}
                  <div className="border-t border-gray-600 pt-8">
                    <div className="flex items-center">
                      <motion.h2
                        className="font-bold text-white leading-none whitespace-nowrap"
                        style={{
                          fontSize: 'clamp(2.5rem, 8vw, 6rem)', // Responsive font size
                          minHeight: '1.2em' // Prevent layout shift
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                      >
                        {displayText}
                      </motion.h2>
                      <span 
                        className={`inline-block ml-2 font-light transition-opacity duration-300 text-[#EB1B26]`}
                        style={{
                          fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                          opacity: showCursor ? 1 : 0
                        }}
                      >
                        |
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Enhanced Form */}
              <div className="p-8 lg:p-12 bg-black/20 backdrop-blur-sm relative">
                {/* Enhanced menu icon */}
                <div className="absolute top-6 right-6">
                  <motion.button
                    type="button"
                    className="text-gray-400 hover:text-[#EB1B26] hover:bg-gray-700/50 rounded-full p-2 transition-colors duration-200"
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <MessageCircle className="h-6 w-6" />
                  </motion.button>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="h-full flex flex-col"
                >
                  {/* Form header */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-white mb-2">Prefer Planning Ahead ?</h3>
                    <p className="text-gray-400">We welcome your questions and feedback</p>
                  </div>

                  {/* Enhanced form with spacing animations */}
                  <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                    <div className="space-y-6 flex-1">
                      {/* Name Field with hover animation */}
                      <motion.div
                        whileHover={{ y: -2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          placeholder="What should we call you..."
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          disabled={isSubmitting}
                          className={`w-full rounded-lg bg-gray-700/50 border px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EB1B26] focus:border-[#EB1B26] transition-all duration-200 ${
                            errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-600'
                          }`}
                          required
                        />
                        {errors.name && (
                          <motion.p 
                            className="text-red-400 text-sm mt-1"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.3 }}
                          >
                            {errors.name}
                          </motion.p>
                        )}
                      </motion.div>

                      {/* Email Field with hover animation */}
                      <motion.div
                        whileHover={{ y: -2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="e.g. aditya@gmail.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          disabled={isSubmitting}
                          className={`w-full rounded-lg bg-gray-700/50 border px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EB1B26] focus:border-[#EB1B26] transition-all duration-200 ${
                            errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-600'
                          }`}
                          required
                        />
                        {errors.email && (
                          <motion.p 
                            className="text-red-400 text-sm mt-1"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.3 }}
                          >
                            {errors.email}
                          </motion.p>
                        )}
                      </motion.div>

                      {/* Phone Field with hover animation */}
                      <motion.div
                        whileHover={{ y: -2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                          Phone
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          placeholder="e.g. 9090XXXX09"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          disabled={isSubmitting}
                          maxLength={10}
                          className={`w-full rounded-lg bg-gray-700/50 border px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EB1B26] focus:border-[#EB1B26] transition-all duration-200 ${
                            errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-600'
                          }`}
                          required
                        />
                        {errors.phone && (
                          <motion.p 
                            className="text-red-400 text-sm mt-1"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.3 }}
                          >
                            {errors.phone}
                          </motion.p>
                        )}
                      </motion.div>

                      {/* Message Field with hover animation */}
                      <motion.div
                        whileHover={{ y: -2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                          Message
                        </label>
                        <textarea
                          id="message"
                          placeholder="Tell us about your project..."
                          rows={4}
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          disabled={isSubmitting}
                          className={`w-full rounded-lg bg-gray-700/50 border px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EB1B26] focus:border-[#EB1B26] transition-all duration-200 resize-none ${
                            errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-600'
                          }`}
                          required
                        />
                        {errors.message && (
                          <motion.p 
                            className="text-red-400 text-sm mt-1"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.3 }}
                          >
                            {errors.message}
                          </motion.p>
                        )}
                      </motion.div>
                    </div>

                    {/* Enhanced form footer */}
                    <div className="flex items-center justify-between mt-8">
                      {/* Corrected color dots: #EB1B26, #FFFFFF, #FFFFFF */}
                      <div className="flex space-x-3">
                        <motion.div 
                          className="w-4 h-4 bg-[#EB1B26] rounded-full"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div 
                          className="w-4 h-4 bg-white rounded-full"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                        />
                        <motion.div 
                          className="w-4 h-4 bg-[#969696] rounded-full"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                        />
                      </div>

                      {/* Enhanced submit button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gray-800 hover:bg-[#EB1B26] text-white border border-gray-600 hover:border-[#EB1B26] px-8 py-3 rounded-lg flex items-center justify-center gap-2 font-bold tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg"
                        whileHover={{ 
                          scale: isSubmitting ? 1 : 1.05,
                          boxShadow: "0 10px 30px rgba(235, 27, 38, 0.3)"
                        }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center space-x-2">
                            <motion.svg
                              className="h-4 w-4 text-white/60"
                              viewBox="0 0 24 24"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.477 0 0 5.477 0 12h4z"
                              />
                            </motion.svg>
                            <span>SENDING</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span>SEND</span>
                            <motion.div
                              animate={{ x: [0, 4, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <ArrowRight className="h-4 w-4" />
                            </motion.div>
                          </div>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
