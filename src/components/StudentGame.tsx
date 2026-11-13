import { useMemo, useState } from 'react'
import { levels } from '../data/levels'
import Game3D from './Game3D'
import type { Progress } from '../types'

export default function StudentGame({studentName,onExit,onProgress}:{studentName:string;onExit:()=>void;onProgress:(p:Progress)=>void}) {
 const [levelIndex,setLevelIndex]=useState(0),[activityIndex,setActivityIndex]=useState(0),[count,setCount]=useState(0),[feedback,setFeedback]=useState(''),[attempts,setAttempts]=useState(0),[errors,setErrors]=useState(0),[completed,setCompleted]=useState<string[]>([])
 const level=levels[levelIndex], activity=level.activities[activityIndex]
 const done= count>=activity.target
 const total=levels.reduce((n,l)=>n+l.activities.length,0)
 const progress=Math.round(completed.length/total*100)
 const finish=()=>{
  const next=[...new Set([...completed,activity.id])]
  setCompleted(next)
  const p:Progress={completed:next,stars:next.length,score:Math.round(next.length/total*10),attempts:attempts+1,errors,seconds:0,updatedAt:new Date().toISOString()}
  onProgress(p);setFeedback('أحسنت! لقد أنجزت النشاط ⭐')
 }
 const collect=()=>{
  if(done)return
  const next=count+1;setCount(next);setFeedback(next===activity.target?'رائع! اكتملت المجموعة. اضغط على زر التحقق.':`أحسنت، أصبح لدينا ${next} عناصر.`)
 }
 const nextActivity=()=>{
  if(activityIndex<level.activities.length-1){setActivityIndex(activityIndex+1)}
  else if(levelIndex<levels.length-1){setLevelIndex(levelIndex+1);setActivityIndex(0)}
  else {setFeedback('أنهيت جميع العوالم! أنت بطل الرياضيات 🏆')}
  setCount(0);setFeedback('')
 }
 return <div className="game-page">
  <header className="game-top"><button className="ghost-btn" onClick={onExit}>← العودة</button><div><b>مغامرات الرياضيات</b><small>مرحباً {studentName}</small></div><span className="pill">⭐ {completed.length}</span></header>
  <div className="game-progress"><div style={{width:`${progress}%`}}/></div>
  <section className="game-heading"><span className="level-icon">{level.icon}</span><div><small>العالم {levelIndex+1} · النشاط {activityIndex+1}</small><h1>{activity.title}</h1><p>{activity.instruction}</p></div></section>
  <Game3D target={activity.target} count={count} onCollect={collect}/>
  <div className="game-controls"><div className="count-chip">العناصر في السلة <strong>{count}</strong> من <strong>{activity.target}</strong></div>
   <p className="feedback" aria-live="polite">{feedback || 'هيا نبدأ! اسحب العناصر إلى السلة.'}</p>
   <div className="button-row"><button className="secondary-btn" onClick={()=>{setCount(0);setFeedback('أعد المحاولة، يمكنك ذلك!');setErrors(errors+1)}}>إعادة المحاولة</button>
   {!done?<button className="primary-btn" onClick={()=>{setAttempts(attempts+1);setFeedback(`واصل العدّ حتى ${activity.target}.`)}}>تحقق من التقدم</button>:<button className="primary-btn" onClick={finish}>تحقق وأنجز النشاط</button>}
   {completed.includes(activity.id)&&<button className="primary-btn" onClick={nextActivity}>النشاط التالي ←</button>}</div>
  </div>
 </div>
}
