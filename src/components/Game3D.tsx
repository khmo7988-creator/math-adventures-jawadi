import { Canvas, useThree } from '@react-three/fiber'
import { Float, Text, Environment, ContactShadows } from '@react-three/drei'
import { useCallback, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

function Ball({ index, color, onCollect }: {index:number;color:string;onCollect:()=>void}) {
 const mesh = useRef<THREE.Mesh>(null)
 const [pos,setPos] = useState<[number,number,number]>([-3.1+(index%4)*.68, 1.25-Math.floor(index/4)*.72, .15])
 const [dragging,setDragging] = useState(false)
 const plane = useMemo(()=>new THREE.Plane(new THREE.Vector3(0,0,1),-.15),[])
 const {camera, gl} = useThree()
 const move = useCallback((e:any)=>{
   if(!dragging || !mesh.current) return
   e.stopPropagation()
   const p = new THREE.Vector3()
   e.ray.intersectPlane(plane,p)
   mesh.current.position.set(p.x,p.y,.15)
 },[dragging,plane])
 const up = useCallback((e:any)=>{
   if(!dragging || !mesh.current) return
   e.stopPropagation(); setDragging(false)
   const p = mesh.current.position
   if(p.x > 1.15 && p.x < 4.1 && p.y > -1.6 && p.y < 1.9) { onCollect() }
   else { mesh.current.position.set(...pos) }
 },[dragging,onCollect,pos])
 return <mesh ref={mesh} position={pos} castShadow onPointerDown={e=>{e.stopPropagation();setDragging(true);(e.target as any).setPointerCapture?.(e.pointerId)}} onPointerMove={move} onPointerUp={up}>
  <sphereGeometry args={[.27,32,32]}/><meshStandardMaterial color={color} roughness={.25} metalness={.08}/>
 </mesh>
}
function Scene({target,count,onCollect}:{target:number;count:number;onCollect:()=>void}) {
 const colors=['#ff7777','#ffc857','#56c8a8','#78a8ff','#ba8be8','#ff9ec4']
 return <>
  <color attach="background" args={['#eaf7ff']}/>
  <ambientLight intensity={1.25}/><directionalLight position={[3,6,5]} intensity={2} castShadow/>
  <Environment preset="city"/>
  <mesh rotation={[-Math.PI/2,0,0]} position={[0,-1.8,0]} receiveShadow><planeGeometry args={[12,8]}/><meshStandardMaterial color="#f7fbff"/></mesh>
  <mesh position={[2.45,-.8,-.15]}><boxGeometry args={[2.45,1.9,.65]}/><meshStandardMaterial color="#70c9b0" transparent opacity={.23} roughness={.2}/></mesh>
  <mesh position={[2.45,-1.72,.2]}><boxGeometry args={[2.5,.16,.8]}/><meshStandardMaterial color="#2e9e82"/></mesh>
  <Text position={[2.45,1.35,.2]} fontSize={.3} color="#236c62" anchorX="center">السلة: {count} / {target}</Text>
  {Array.from({length:target},(_,i)=><Ball key={`${target}-${i}`} index={i} color={colors[i%colors.length]} onCollect={onCollect}/>)}
  <ContactShadows position={[0,-1.79,0]} opacity={.22} scale={10} blur={2}/>
 </>
}
export default function Game3D({target,count,onCollect}:{target:number;count:number;onCollect:()=>void}) {
 return <div className="game-canvas"><Canvas shadows camera={{position:[0,0,9],fov:42}} gl={{antialias:true}} dpr={[1,1.5]}><Scene target={target} count={count} onCollect={onCollect}/></Canvas><div className="canvas-hint">اسحب الكرات من الجهة اليسرى إلى السلة على اليمين</div></div>
}
