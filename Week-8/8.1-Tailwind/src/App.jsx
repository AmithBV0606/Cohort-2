function App() {
  return (
    // Flex-box : 
    // <div className="text-white flex justify-between">
    //   <div className="bg-red-500 w-48">I am div1</div>
    //   <div className="bg-blue-500 w-48">I am div2</div>
    //   <div className="bg-yellow-500 w-48">I am div3</div>
    // </div>

    // Grid : 
    <div className="text-white grid grid-cols-6">
    <div className="bg-red-500 col-span-6 sm:col-span-2 md:col-span-3">I am div1</div>
    <div className="bg-blue-500 col-span-6 sm:col-span-2 md:col-span-2">I am div2</div>
    <div className="bg-green-500 col-span-6 sm:col-span-2 md:col-span-1">I am div3</div>
  </div>
  )
}

export default App