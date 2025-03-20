// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { Search, FileText, X, ExternalLink, File } from "lucide-react"
// import { Badge } from "@/components/ui/badge"
// import { cn } from "@/lib/utils"

// const dummyResults = [
//   {
//     id: 1,
//     title: "Annual Financial Report 2023",
//     category: "Finance",
//     pdfUrl: "/documents/financial-report-2023.pdf", // Add PDF URLs
//   },
//   {
//     id: 2,
//     title: "Product Development Roadmap",
//     category: "Strategy",
//     pdfUrl: "/documents/product-roadmap.pdf",
//   },
//   {
//     id: 3,
//     title: "Market Research Analysis",
//     category: "Research",
//   },
//   {
//     id: 4,
//     title: "Employee Handbook",
//     category: "HR",
//   },
//   {
//     id: 5,
//     title: "Project Management Guidelines",
//     category: "Management",
//   },
//   {
//     id: 6,
//     title: "Quarterly Sales Report Q1",
//     category: "Sales",
//   },
//   {
//     id: 7,
//     title: "Brand Identity Guidelines",
//     category: "Marketing",
//   },
//   {
//     id: 8,
//     title: "Technical Documentation",
//     category: "Engineering",
//     pdfUrl: "/documents/technical-documentation.pdf",
//   },
//   {
//     id: 9,
//     title: "Customer Feedback Analysis",
//     category: "Research",
//   },
//   {
//     id: 10,
//     title: "Competitive Analysis Report",
//     category: "Strategy",
//   },
//   {
//     id: 11,
//     title: "Product Launch Plan",
//     category: "Marketing",
//   },
//   {
//     id: 12,
//     title: "Investor Presentation",
//     category: "Finance",
//   },
// ]

// // Available categories for filtering
// const categories = [...new Set(dummyResults.map((item) => item.category))].sort()

// export default function SearchPage() {
//   const [searchQuery, setSearchQuery] = useState("")
//   const [results, setResults] = useState(dummyResults)
//   const [isSearching, setIsSearching] = useState(false)
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
//   const [isFocused, setIsFocused] = useState(false)

//   // Optimized search function with debounce
//   const performSearch = useCallback(() => {
//     if (!searchQuery.trim() && !selectedCategory) {
//       setResults(dummyResults)
//       return
//     }

//     let filtered = [...dummyResults]

//     if (searchQuery.trim()) {
//       filtered = filtered.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
//     }

//     if (selectedCategory) {
//       filtered = filtered.filter((item) => item.category === selectedCategory)
//     }

//     setResults(filtered)
//     setIsSearching(false)
//   }, [searchQuery, selectedCategory])

//   useEffect(() => {
//     setIsSearching(true)
//     const timer = setTimeout(performSearch, 150)
//     return () => clearTimeout(timer)
//   }, [searchQuery, selectedCategory, performSearch])

//   const handleClearSearch = () => {
//     setSearchQuery("")
//     setSelectedCategory(null)
//   }

//   const handleCategorySelect = (category: string) => {
//     setSelectedCategory((prev) => (prev === category ? null : category))
//   }

//   // Add function to handle PDF opening
//   const openPdf = (pdfUrl: string, e: React.MouseEvent) => {
//     e.preventDefault();
//     console.log("Opening PDF:", pdfUrl);
//     window.open(pdfUrl, '_blank');
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 py-12 px-4">
//       <div className="max-w-3xl mx-auto">
//         <div className="text-center mb-10">
//           <h1 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
//             K-Prep Search
//           </h1>
//           <p className="text-muted-foreground max-w-md mx-auto">
//             Find your resources instantly with our modern search interface
//           </p>
//         </div>

//         {/* Search Bar with Glass Effect */}
//         <div
//           className={cn(
//             "relative mb-8 transition-all duration-300 rounded-2xl",
//             isFocused ? "shadow-[0_0_30px_rgba(var(--primary-rgb),0.15)]" : "",
//           )}
//         >
//           <div className="absolute inset-0 bg-primary/5 rounded-2xl backdrop-blur-sm border border-primary/10"></div>
//           <div className="relative flex items-center p-2">
//             <div
//               className={cn(
//                 "flex items-center justify-center h-10 w-10 rounded-full transition-colors",
//                 isFocused ? "text-primary bg-primary/10" : "text-muted-foreground",
//               )}
//             >
//               <Search className="h-5 w-5" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search documents..."
//               className="flex-1 bg-transparent border-none h-12 px-3 text-lg focus:outline-none placeholder:text-muted-foreground/70"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onFocus={() => setIsFocused(true)}
//               onBlur={() => setIsFocused(false)}
//             />
//             {(searchQuery || selectedCategory) && (
//               <button
//                 onClick={handleClearSearch}
//                 className="h-8 w-8 flex items-center justify-center rounded-full bg-muted/50 hover:bg-muted transition-colors mr-2"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Category Filters */}
//         <div className="flex flex-wrap gap-2 mb-6">
//           {categories.map((category) => (
//             <Badge
//               key={category}
//               variant={selectedCategory === category ? "default" : "outline"}
//               className={cn(
//                 "cursor-pointer transition-all hover:shadow-md",
//                 selectedCategory === category
//                   ? "bg-primary text-primary-foreground"
//                   : "hover:bg-primary/10 hover:text-primary",
//               )}
//               onClick={() => handleCategorySelect(category)}
//             >
//               {category}
//             </Badge>
//           ))}
//         </div>

//         {/* Results Count */}
//         <div className="mb-6">
//           {isSearching ? (
//             <div className="flex items-center gap-2 text-muted-foreground">
//               <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
//               <span>Searching...</span>
//             </div>
//           ) : (
//             <div className="flex items-center justify-between">
//               <p className="font-medium">
//                 <span className="text-primary font-bold text-xl">{results.length}</span>
//                 <span className="ml-2 text-sm">{results.length === 1 ? "document" : "documents"} found</span>
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Results Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {results.length > 0 ? (
//             results.map((result, index) => (
//               <div
//                 key={result.id}
//                 className="group"
//                 style={{
//                   animation: `fadeIn 0.3s ease forwards`,
//                   animationDelay: `${index * 0.05}s`,
//                   opacity: 0,
//                 }}
//               >
//                 <a
//                   href={result.pdfUrl}
//                   onClick={(e) => result.pdfUrl ? openPdf(result.pdfUrl, e) : e.preventDefault()}
//                   className="block h-full p-5 rounded-xl bg-card/30 backdrop-blur-sm border border-primary/5 hover:border-primary/20 hover:bg-primary/5 transition-all duration-300 hover:shadow-[0_10px_20px_rgba(var(--primary-rgb),0.1)]"
//                 >
//                   <div className="flex items-center gap-4">
//                     <div className="bg-gradient-to-br from-red-500/20 to-red-600/5 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
//                       <File className="h-5 w-5 text-red-500" />
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="font-medium group-hover:text-primary transition-colors line-clamp-1">
//                         {result.title}
//                       </h3>
//                       <div className="flex items-center gap-2 mt-1">
//                         <Badge variant="secondary" className="text-xs">
//                           {result.category}
//                         </Badge>
//                         {result.pdfUrl && (
//                           <Badge variant="outline" className="text-xs bg-red-500/10 text-red-500 border-red-500/20">
//                             PDF
//                           </Badge>
//                         )}
//                       </div>
//                     </div>
//                     {result.pdfUrl && (
//                       <div className="hidden md:flex items-center text-primary/70 group-hover:text-primary">
//                         <ExternalLink className="h-4 w-4 mr-1" />
//                         <span className="text-xs">View</span>
//                       </div>
//                     )}
//                   </div>
//                 </a>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-full text-center py-16 px-4 rounded-xl border border-dashed border-primary/10 bg-primary/5">
//               <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <FileText className="h-8 w-8 text-primary opacity-70" />
//               </div>
//               <h3 className="font-medium text-xl mb-2">No documents found</h3>
//               <p className="text-sm text-muted-foreground max-w-xs mx-auto">
//                 Try adjusting your search terms or removing filters
//               </p>
//             </div>
//           )}
//         </div>
        
//         {/* Add custom CSS for fadeIn animation */}
//         <style jsx>{`
//           @keyframes fadeIn {
//             0% { opacity: 0; transform: translateY(10px); }
//             100% { opacity: 1; transform: translateY(0); }
//           }
//         `}</style>
//       </div>
//     </div>
//   )
// }

import React from 'react'

function page() {
  return (
    <div className='flex justify-center items-center h-[80vh]'>
      <h1 className='text-usersidebar-light-link dark:text-usersidebar-dark-link font-extrabold text-5xl lg:text-4xl text-3xl '>Coming Soon...</h1>
    </div>
  )
}

export default page
