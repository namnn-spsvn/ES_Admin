// "use client";
// import React, { useMemo } from "react";
// import { useParams } from "next/navigation";
// import {
//   FlashcardArray,
//   IFlashcard,
//   useFlashcardArray,
// } from "react-quizlet-flashcard";
// import "react-quizlet-flashcard/dist/index.css";

// import {
//   useGetFlashCardQuery,
//   useGetFlashcardByIdQuery,
// } from "../../apis/index";

// function Excercise() {
//   const params = useParams();
//   const { topic, id } = params;

//   const { data, isLoading, error } = useGetFlashcardByIdQuery({ topic_id: id });

//   const deck: IFlashcard[] = useMemo(() => {
//     if (!data || !Array.isArray(data.items)) return [];

//     return data.items.map((item: any) => ({
//       front: {
//         html: (
//           <div style={{ textAlign: "center" }}>
//             <p>
//               <b>{item.word}</b> <i>{item.phonetic}</i> ({item.part_of_speech})
//             </p>

//             {item.image_url && (
//               <img
//                 src={item.image_url}
//                 alt={item.word}
//                 style={{
//                   width: "200px",
//                   borderRadius: "10px",
//                   marginTop: "10px",
//                 }}
//               />
//             )}

//             {item.audio_url && (
//               <audio controls style={{ marginTop: "10px" }}>
//                 <source src={item.audio_url} type="audio/mpeg" />
//                 Trình duyệt không hỗ trợ audio.
//               </audio>
//             )}
//           </div>
//         ),
//         style: { color: "blue" },
//       },
//       back: {
//         html: (
//           <div>
//             <p>
//               <b>Ý nghĩa:</b> {item.meaning_vi}
//             </p>
//             <p>
//               <b>Ví dụ:</b> {item.example_en}
//             </p>
//             <p>
//               <b>Dịch:</b> {item.example_vi}
//             </p>
//           </div>
//         ),
//         style: { color: "green" },
//       },
//     }));
//   }, [data]);

//   console.log("đây là deck:", deck);
//   const flipArrayHook = useFlashcardArray({ deckLength: deck.length });

//   if (isLoading) return <p>Đang tải dữ liệu...</p>;
//   if (error) return <p>Lỗi tải dữ liệu flashcard!</p>;

//   return (
//     <div>
//       <h1>Chủ đề: {decodeURIComponent(topic as string)}</h1>
//       <p>ID: {id}</p>
//       {deck.length > 0 ? (
//         <FlashcardArray flipArrayHook={flipArrayHook} deck={deck} />
//       ) : (
//         <p>Không có flashcard nào.</p>
//       )}
//     </div>
//   );
// }

// export default Excercise;
