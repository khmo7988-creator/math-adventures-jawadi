import type { Level } from '../types'
export const levels: Level[] = [
 { id:'eight-nine', title:'مغامرة العددين 8 و9', subtitle:'العدّ وتمثيل الكميات وكتابة الأعداد', color:'#ff8c69', icon:'🎈', activities:[
  {id:'balloons8',title:'عدّ البالونات',instruction:'اسحب 8 بالونات إلى السلة، واحدة تلو الأخرى.',target:8,kind:'collect'},
  {id:'group9',title:'كوّن مجموعة من 9',instruction:'اجمع 9 كرات في الصندوق.',target:9,kind:'collect'},
  {id:'match8',title:'طابق العدد والكمية',instruction:'كوّن مجموعة من 8 عناصر.',target:8,kind:'collect'}
 ]},
 { id:'ten', title:'سرّ العدد 10', subtitle:'تكوين العشرة وكتابتها وتمثيلها', color:'#50b99a', icon:'⭐', activities:[
  {id:'collect10',title:'اجمع عشرة عناصر',instruction:'اسحب 10 كرات إلى الصندوق الشفاف.',target:10,kind:'collect'},
  {id:'make10',title:'أكمل المجموعة',instruction:'أضف العناصر حتى يصبح المجموع 10.',target:10,kind:'collect'},
  {id:'ten-check',title:'تأكد من العدد 10',instruction:'اجمع عشرة عناصر ثم تحقق من العدد.',target:10,kind:'collect'}
 ]},
 { id:'six-seven', title:'تحدّي العددين 6 و7', subtitle:'العدّ والمقارنة والترتيب', color:'#8c83e8', icon:'🚚', activities:[
  {id:'collect6',title:'كوّن مجموعة من 6',instruction:'اسحب 6 عناصر إلى الصندوق.',target:6,kind:'collect'},
  {id:'collect7',title:'كوّن مجموعة من 7',instruction:'اسحب 7 عناصر إلى الصندوق.',target:7,kind:'collect'},
  {id:'compare',title:'قارن بين مجموعتين',instruction:'تدرّب على أكبر من وأصغر من ويساوي.',target:7,kind:'compare'}
 ]}
]
