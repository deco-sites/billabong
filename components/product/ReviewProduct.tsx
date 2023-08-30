// import Icon from "$store/components/ui/Icon.tsx"

// function reviewRender(availability: number) {
//   const arrayFiveStars = ["", "", "", "", ""]
//   return arrayFiveStars.map((_, index) => (
//     <Icon id="Star" class={`${index + 1 <= availability ? "text-[#000]" : "text-[#FFF]"}`} fill={index + 1 <= availability ? "#000" : "#FFF"} width={30} height={30} />
//   ))

// }

// export default function ReviewProduct() {
//   return (
//     <div class="flex flex-col w-full">
//       <div class="flex justify-between">
//         <div class="flex">
//           <span class="text-3xl font-semibold">Score:</span>
//           { reviewRender(3) }
//         </div>
//       </div>
//     </div>
//   )
// }
