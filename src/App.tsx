import { useEffect, useState } from 'react'
import { BookOpen, GraduationCap, ShieldCheck, Star, Trophy, Users, Settings, LogOut, Play, Sparkles } from 'lucide-react'
import StudentGame from './components/StudentGame'
import { levels } from './data/levels'
import { backendReady } from './lib/supabase'
import { emptyProgress, loadProgress, saveProgress } from './lib/progress'
import type { Progress } from './types'

type Mode='home'|'student'|'teacher'
export default function App(){
 const [mode,setMode]=useState<Mode>('home'),[name,setName]=useState('التلميذ'),[studentId,setStudentId]=useState('local-student'),[progress,setProgress]=useState<Progress>(emptyProgress()),[students,setStudents]=useState<{id:string;name:string;p:Progress}[]>([])
 useEffect(()=>{const p=loadProgress();setProgress(p[studentId]||emptyProgress());setStudents(Object.entries(p).map(([id,v])=>({id,name:id==='local-student'?'التلميذ التجريبي':id,p:v})))},[studentId])
 const update=(p:Progress)=>{setProgress(p);saveProgress(studentId,p);setStudents(s=>[{id:studentId,name,p},...s.filter(x=>x.id!==studentId)])}
 if(mode==='student')return <StudentGame studentName={name} onExit={()=>setMode('home')} onProgress={update}/>
 return <main className="app-shell">
  <nav className="navbar"><div className="brand-mark">✦</div><div className="brand"><b>مغامرات الرياضيات</b><small>الأستاذة جوادي · السنة الأولى ابتدائي</small></div><div className="nav-spacer"/><span className={`connection ${backendReady?'connected':''}`}>{backendReady?'قاعدة البيانات متصلة':'وضع التشغيل المحلي'}</span></nav>
  {mode==='home'?<>
   <section className="hero"><div className="hero-copy"><span className="eyebrow"><Sparkles size={15}/> نتعلم ونلعب ونكتشف</span><h1>مرحباً بك في<br/><em>مغامرات الرياضيات!</em></h1><p>هيا نكتشف عالم الأعداد، ونعدّ الأشياء، ونجمع الكرات، ونحصل على النجوم.</p>
   <div className="hero-actions"><button className="primary-btn large" onClick={()=>setMode('student')}><Play size={18} fill="currentColor"/> ابدأ المغامرة</button><button className="secondary-btn large" onClick={()=>setMode('teacher')}><ShieldCheck size={18}/> فضاء الأستاذة</button></div>
   <div className="hero-stats"><span>⭐ {progress.stars} نجوم</span><span>🏆 {progress.score}/10 العلامة</span></div></div><div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="floating-ball ball-a">8</div><div className="floating-ball ball-b">9</div><div className="floating-ball ball-c">10</div><div className="teacher-avatar">👩🏻‍🏫</div><div className="sparkle s1">✦</div><div className="sparkle s2">✧</div></div></section>
   <section className="worlds"><div className="section-title"><div><small>رحلتك التعليمية</small><h2>اختر عالمك</h2></div><span>3 عوالم تعليمية</span></div><div className="world-grid">{levels.map((l,i)=><article className="world-card" key={l.id} style={{'--accent':l.color} as React.CSSProperties}><div className="world-emoji">{l.icon}</div><span className="world-number">العالم {i+1}</span><h3>{l.title}</h3><p>{l.subtitle}</p><button onClick={()=>setMode('student')}>ابدأ اللعب <span>←</span></button></article>)}</div></section>
   <section className="feature-strip"><div><BookOpen/><b>تعلم باللعب</b><small>أنشطة تفاعلية ممتعة</small></div><div><Star/><b>نجوم ومكافآت</b><small>تشجيع دون عقاب</small></div><div><Trophy/><b>تقدم محفوظ</b><small>تابع إنجازاتك</small></div></section>
   <footer>© مغامرات الرياضيات · الأستاذة جوادي</footer>
  </>:<section className="teacher-panel"><button className="ghost-btn" onClick={()=>setMode('home')}>← الرئيسية</button><div className="panel-title"><ShieldCheck size={30}/><div><h1>فضاء الأستاذة</h1><p>متابعة إنجازات التلاميذ</p></div></div><div className="teacher-summary"><div><Users/><strong>{students.length}</strong><span>سجلات محلية</span></div><div><Star/><strong>{progress.stars}</strong><span>نجوم مكتسبة</span></div><div><Trophy/><strong>{progress.score}/10</strong><span>آخر علامة</span></div></div><div className="panel-card"><h2>ملخص التقدم</h2><p>الاسم: {name}</p><p>الأنشطة المكتملة: {progress.completed.length} من 9</p><p>عدد المحاولات: {progress.attempts}</p><p>الأخطاء المسجلة: {progress.errors}</p><p>آخر تحديث: {progress.updatedAt===' '?'-':new Date(progress.updatedAt).toLocaleString('ar-DZ')}</p><button className="secondary-btn" onClick={()=>{saveProgress(studentId,emptyProgress());setProgress(emptyProgress())}}>إعادة تعيين تقدم التلميذ التجريبي</button></div><div className="notice"><b>ملاحظة قبل النشر:</b> لوحة الأستاذة الحالية تعرض بيانات هذا المتصفح محلياً. لتفعيل حسابات مستقلة وآمنة لكل أستاذ وتلميذ، اربط مشروع Supabase وأكمل إعداد سياسات الحماية الموضحة في ملف README.</div></section>}
 </main>
}
