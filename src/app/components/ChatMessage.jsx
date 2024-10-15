// function ChatMessage({ message }) {
//   const isImage = message.content.startsWith('data:image') || message.content.match(/\.(jpeg|jpg|gif|png)$/) != null;
//   const isGif = message.content.match(/\.gif$/) != null;

//   return (
//     <div className="flex items-start space-x-3 mb-4 animate-fade-in">
//       <div className="flex-shrink-0">
//         <Image
//           className="h-10 w-10 rounded-full border-2 border-indigo-500"
//           src={message.sender.avatar}
//           alt={message.sender.name}
//           width={40}
//           height={40}
//         />
//       </div>
//       <div className="flex-1">
//         <div className="bg-gray-100 rounded-lg shadow-sm p-3">
//           <p className="text-sm font-medium text-indigo-600">{message.sender.name}</p>
//           {isImage ? (
//             <Image
//               src={message.content}
//               alt="Shared image"
//               width={300}
//               height={200}
//               className="mt-2 rounded-lg"
//             />
//           ) : isGif ? (
//             <img src={message.content} alt="Shared GIF" className="mt-2 rounded-lg" />
//           ) : (
//             <p className="mt-1 text-sm text-gray-700">
//               <ReactEmoji text={message.content} />
//             </p>
//           )}
//         </div>
//         <span className="text-xs text-gray-500 mt-1 block">
//           {new Date(message.timestamp).toLocaleString()}
//         </span>
//       </div>
//     </div>
//   );
// }
