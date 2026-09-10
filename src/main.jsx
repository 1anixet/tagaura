import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowRight, ArrowUpRight, Bluetooth, Check, ChevronDown, CircleUserRound,
  Clock3, Cpu, Fingerprint, Home as HomeIcon, KeyRound, LockKeyhole,
  Menu, MessageSquare, Moon, Nfc, Play, Power, QrCode, ShieldCheck,
  Sparkles, Sun, Tag, Users, Wifi, X, Zap
} from 'lucide-react'
import './styles.css'
import ThreeHeroScene from './ThreeHeroScene'
import Mini3DScene from './Mini3DScene'

const featureCards = [
  { number: '01', icon: Nfc, title: 'NFC automation', text: 'One physical tap can trigger a complete routine.', tone: 'cyan', visual: 'tag' },
  { number: '02', icon: Users, title: 'Family coordination', text: 'Share only what your household needs to know.', tone: 'blue', visual: 'family' },
  { number: '03', icon: HomeIcon, title: 'Home IN / OUT', text: 'Know who is home without tracking where they are.', tone: 'violet', visual: 'presence' },
  { number: '04', icon: MessageSquare, title: 'Family board', text: 'A tap opens the notes that keep home moving.', tone: 'orange', visual: 'board' },
  { number: '05', icon: Moon, title: 'Smart routines', text: 'Sleep, focus, and leaving home, configured once.', tone: 'gold', visual: 'routine' },
  { number: '06', icon: LockKeyhole, title: 'Password vault', text: 'NFC is the trigger. Biometric access is the lock.', tone: 'cyan', visual: 'vault' },
  { number: '07', icon: Power, title: 'Smart home', text: 'A low-cost path from phone to controller to device.', tone: 'blue', visual: 'smart' },
  { number: '08', icon: Wifi, title: 'Universal NFC', text: 'Business cards, Wi-Fi, URLs, and custom actions.', tone: 'violet', visual: 'universal' },
]

const routines = [
  { id: 'sleep', label: 'Sleep', icon: Moon, eyebrow: 'Bedside NFC', title: 'Close the day with one tap.', copy: 'DND, alarm, lights, and volume move together. You decide which actions belong to the routine.', actions: ['DND ON', 'Alarm 07:00', 'Lights OFF', 'Volume 0'], accent: 'violet' },
  { id: 'focus', label: 'Focus', icon: Sparkles, eyebrow: 'Study NFC', title: 'Make focus a physical habit.', copy: 'The desk becomes a context switch: a tap clears the noise and starts the work.', actions: ['DND ON', '50 min timer', 'Volume 30%', 'Desk light ON'], accent: 'cyan' },
  { id: 'leave', label: 'Leave home', icon: ArrowRight, eyebrow: 'Entrance NFC', title: 'Leave the house in one motion.', copy: 'Mark OUT, sync your family status, and turn off compatible devices locally.', actions: ['Mark OUT', 'Family sync', 'Lights OFF', 'Fan OFF'], accent: 'orange' },
]

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}

function Nav() {
  const [open, setOpen] = useState(false)
  const links = [['How it works', '#how-it-works'], ['Features', '#features'], ['Privacy', '#privacy'], ['Security', '#security'], ['About', '#about']]
  return <header className="nav-shell">
    <a className="brand" href="#top" aria-label="NFC Home home"><span className="brand-mark"><Nfc size={19} /></span><span>NFC <b>Home</b></span></a>
    <nav className={open ? 'nav-links is-open' : 'nav-links'}>{links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}</nav>
    <a className="nav-cta" href="#how-it-works">Explore project <ArrowUpRight size={15} /></a>
    <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X size={20} /> : <Menu size={20} />}</button>
  </header>
}

function Signal({ className = '' }) { return <span className={`signal ${className}`} aria-hidden="true"><i /><i /><i /></span> }

function Phone({ active = false }) {
  return <div className={`phone ${active ? 'phone-active' : ''}`}>
    <div className="phone-notch" />
    <div className="phone-screen"><div className="status-row"><span>9:41</span><span>•••</span></div><div className="phone-orb"><Nfc size={24} /></div><small>{active ? 'STUDY MODE' : 'READY TO TAP'}</small><strong>{active ? 'Routine activated' : 'NFC Home'}</strong><div className="phone-list"><span><Tag size={12} /> FOCUS_001 <b>{active ? 'LIVE' : 'TAG ID'}</b></span><span><ShieldCheck size={12} /> Permission <b>OK</b></span><span><Clock3 size={12} /> Local action <b>ON</b></span></div></div>
  </div>
}

function HouseScene() {
  return <div className="house-scene"><ThreeHeroScene /><div className="scene-label label-study"><span>Study</span><Tag size={15} /></div><div className="scene-label label-home"><span>Home IN / OUT</span><HomeIcon size={15} /></div><div className="scene-label label-vault"><span>Vault</span><LockKeyhole size={15} /></div><div className="scene-label label-board"><span>Family Board</span><MessageSquare size={15} /></div></div>
}

function Hero() {
  return <section className="hero section-pad" id="top"><div className="hero-copy reveal"><div className="eyebrow"><span className="eyebrow-dot" /> Physical interface / 01</div><h1>Tap the physical world.<br /><em>Control your digital home.</em></h1><p>A privacy-first platform that turns physical places and objects into simple digital controls for home, family, and everyday routines.</p><div className="hero-actions"><a className="button primary" href="#how-it-works">See how it works <ArrowRight size={16} /></a><a className="text-link" href="#privacy">Explore privacy <ArrowUpRight size={15} /></a></div><div className="hero-meta"><span><Nfc size={15} /> NFC automation</span><span><Users size={15} /> Family sync</span><span><ShieldCheck size={15} /> Encrypted by design</span></div></div><HouseScene /><div className="scroll-cue"><span>Scroll to enter the interface</span><ChevronDown size={15} /></div></section>
}

function PrivacySection() {
  return <section className="privacy section-pad reveal" id="privacy"><div className="section-intro"><div className="eyebrow">Private by architecture / 02</div><h2>Your privacy.<br /><em>Our priority.</em></h2><p>The phone makes the decision. The server synchronizes encrypted events. The family device decrypts only what it is authorized to see.</p><a className="text-link" href="#security">Read the security model <ArrowUpRight size={15} /></a></div><div className="privacy-visual security-journey"><div className="security-location"><div className="location-label"><span className="location-dot office" /> Office / Phone A</div><Mini3DScene variant="office" /><strong>Encrypt on device</strong></div><div className="security-connector"><span className="encrypted-packet" /><span className="connector-line" /><span className="encrypted-packet second" /><small className="connector-detail">encrypted payload</small></div><div className="security-server"><div className="server-cloud"><div className="server-stack"><div /><div /><div /></div><ShieldCheck size={22} /></div><div className="server-nodes"><i /><i /><i /></div><b>Encrypted sync</b><small>server sees no readable family data</small></div><div className="security-connector reverse"><span className="encrypted-packet" /><span className="connector-line" /><span className="encrypted-packet second" /><small className="connector-detail">authorized payload</small></div><div className="security-location home-location"><div className="location-label"><span className="location-dot home" /> Home / Phone B</div><Mini3DScene variant="home" /><strong>Decrypt when authorized</strong></div><div className="security-caption">Phone A → server nodes → encrypted relay → Phone B</div><div className="privacy-note"><LockKeyhole size={15} /> Demonstration of the intended privacy architecture. This frontend does not implement production encryption.</div></div></section>
}

function HowItWorks() {
  const steps = [['01', 'Tap', Nfc, 'A physical tag carries an ID, not your secrets.'], ['02', 'Identify', CircleUserRound, 'Your phone knows the user and registered device.'], ['03', 'Authorize', KeyRound, 'Permissions decide whether this action is allowed.'], ['04', 'Act', Zap, 'Local routines happen. Family events sync encrypted.']]
  return <section className="how section-pad reveal" id="how-it-works"><div className="section-heading"><div><div className="eyebrow">The simple loop / 03</div><h2>Tap. Trigger. Done.</h2></div><p>The complexity lives in setup. Everyday life stays physical, obvious, and fast.</p></div><div className="process-line" /> <div className="process-grid">{steps.map(([number, title, Icon, text]) => <div className="process-step" key={title}><span className="step-number">{number}</span><div className="step-icon"><Icon size={22} /></div><h3>{title}</h3><p>{text}</p></div>)}</div><div className="architecture-strip"><span>physical world</span><ArrowRight /><span>NFC tag</span><ArrowRight /><span>Android phone</span><ArrowRight /><span>local action</span><ArrowRight /><span>encrypted sync</span></div></section>
}

function TapDemo() {
  const [active, setActive] = useState(false)
  return <section className={`tap-demo section-pad reveal ${active ? 'demo-active' : ''}`}><div className="demo-copy"><div className="eyebrow">Interactive simulation / 04</div><h2>Make the invisible<br /><em>feel physical.</em></h2><p>Try the core gesture. This is a frontend simulation of a Focus tag calling a configured routine.</p><button className="button primary" onClick={() => setActive(true)}><Nfc size={16} /> {active ? 'Study mode active' : 'Tap NFC'}</button>{active && <div className="demo-toast"><Check size={16} /> FOCUS_001 recognized. Local routine complete.</div>}</div><div className="tap-stage"><Mini3DScene variant="focus" /><div className="action-panel"><div className="panel-top"><span><span className="live-dot" /> {active ? 'routine live' : 'waiting'}</span><span>local action</span></div><h3>{active ? 'STUDY MODE ACTIVATED' : 'Tap to preview'}</h3><div className="action-list">{['DND ON', '50 min focus timer', 'Volume 30%', 'Desk light ON'].map((item, index) => <span key={item} className={active ? 'checked' : ''}>{active && <Check size={12} />}{item}<b>{active ? 'ON' : index === 0 ? '—' : 'ready'}</b></span>)}</div></div></div></section>
}

function FamilySection() {
  const [members, setMembers] = useState([{ name: 'You', status: 'OUT', time: '9:42 PM' }, { name: 'Mom', status: 'IN', time: '8:17 PM' }, { name: 'Dad', status: 'IN', time: '7:51 PM' }])
  const [note, setNote] = useState('')
  const addNote = () => { if (note.trim()) setNote('') }
  return <section className="family section-pad reveal" id="security"><div className="family-top"><div><div className="eyebrow">A household, not a dashboard / 05</div><h2>Know who’s home.<br /><em>Without tracking where they are.</em></h2></div><p>Home IN / OUT is intentional presence. No continuous GPS, no invisible map trail, just a tap at the door and a shared family state.</p></div><div className="family-grid"><div className="presence-panel"><div className="panel-heading"><span><HomeIcon size={16} /> Home status</span><small>GPS-free presence</small></div><div className="presence-house"><Mini3DScene variant="presence" /></div><div className="member-list">{members.map((member) => <div className="member-row" key={member.name}><div className="avatar">{member.name[0]}</div><strong>{member.name}<small>{member.time}</small></strong><span className={member.status === 'IN' ? 'status in' : 'status out'}>{member.status}</span></div>)}</div><button className="small-action" onClick={() => setMembers((current) => current.map((member, index) => index === 0 ? { ...member, status: member.status === 'OUT' ? 'IN' : 'OUT', time: 'just now' } : member))}><Nfc size={14} /> Simulate {members[0].status === 'OUT' ? 'Home IN' : 'Home OUT'}</button></div><div className="board-panel"><div className="board-header"><div><div className="eyebrow">Home board NFC</div><h3>Small notes.<br /><span>Shared context.</span></h3></div><MessageSquare size={22} /></div><div className="notes"><div className="note yellow"><b>Mom <small>6:30 PM</small></b><span>Milk le aana</span></div><div className="note red"><b>Dad <small>4:10 PM</small></b><span>Gas booking karni hai</span></div><div className="note blue"><b>You <small>6:00 PM</small></b><span>Odoo submission</span></div>{note && <div className="note green"><b>You <small>just now</small></b><span>{note}</span></div>}</div><div className="note-entry"><input value={note} onChange={(event) => setNote(event.target.value)} placeholder="Add a demo note" onKeyDown={(event) => event.key === 'Enter' && addNote()} /><button onClick={addNote} aria-label="Add note"><ArrowUpRight size={16} /></button></div></div></div></section>
}

function Routines() {
  const [selected, setSelected] = useState('focus')
  const routine = routines.find((item) => item.id === selected)
  return <section className="routines section-pad reveal" id="features"><div className="section-heading"><div><div className="eyebrow">Your home, in context / 06</div><h2>Routines that start<br /><em>where they happen.</em></h2></div><p>Configure once, then make the physical world your shortcut.</p></div><div className="routine-layout"><div className="routine-tabs">{routines.map(({ id, label, icon: Icon }) => <button className={selected === id ? 'selected' : ''} key={id} onClick={() => setSelected(id)}><Icon size={17} /> {label}<ArrowRight size={14} /></button>)}<div className="builder-card"><div className="eyebrow">Automation builder</div><p>WHEN <b>NFC: {routine.label.toUpperCase()}</b></p><div className="builder-divider" /><p>THEN</p>{routine.actions.slice(0, 3).map((action) => <span key={action}><Check size={13} /> {action}</span>)}</div></div><div className={`routine-visual ${routine.accent}`}><div className="room-scene"><Mini3DScene variant={routine.id} /></div><div className="routine-copy"><div className="eyebrow">{routine.eyebrow}</div><h3>{routine.title}</h3><p>{routine.copy}</p><div className="routine-actions">{routine.actions.map((action) => <span key={action}><Check size={13} /> {action}</span>)}</div></div></div></div></section>
}

function VaultAndSmart() {
  return <section className="vault-smart section-pad reveal"><div className="vault-card"><div className="eyebrow">Protected access / 07</div><h2>NFC is the trigger.<br /><em>Biometrics are the lock.</em></h2><p>A vault tag never contains the password. It points your authorized phone toward a local authentication step.</p><div className="vault-flow"><span><Nfc size={17} /> Tap</span><ArrowRight /><span><Fingerprint size={17} /> Verify</span><ArrowRight /><span><LockKeyhole size={17} /> Unlock</span></div><div className="vault-scene"><Mini3DScene variant="vault" /></div></div><div className="smart-card"><div className="eyebrow">Expansion layer / 08</div><h2>Turn the home you have<br /><em>into a smart home.</em></h2><p>Start with a phone and tags. Add a local controller like ESP32 when you are ready to connect lights, fans, or appliances.</p><div className="smart-chain"><span><Nfc size={18} /> NFC</span><ArrowRight /><span><Bluetooth size={18} /> Phone</span><ArrowRight /><span><Cpu size={18} /> ESP32</span><ArrowRight /><span><Power size={18} /> Home</span></div><div className="smart-scene"><Mini3DScene variant="smart" /></div></div></section>
}

function FeatureCard({ card }) { const Icon = card.icon; return <article className={`feature-card ${card.tone}`}><div className="card-image"><Mini3DScene variant={card.visual === 'tag' ? 'focus' : card.visual} /></div><div className="card-copy"><span className="card-number">{card.number}</span><div><h3><Icon size={15} /> {card.title}</h3><p>{card.text}</p></div><ArrowUpRight size={16} /></div></article> }

function FeatureGrid() { return <section className="feature-section section-pad reveal"><div className="feature-heading"><div><div className="eyebrow">Explore the system / 09</div><h2>One physical interface.<br /><em>Many useful moments.</em></h2></div><p>Personal automation, family coordination, and an affordable path to home control, held together by permission-first design.</p></div><div className="feature-grid">{featureCards.map((card) => <FeatureCard key={card.number} card={card} />)}</div></section> }

function Footer() { return <footer className="footer section-pad" id="about"><div className="footer-top"><div><a className="brand" href="#top"><span className="brand-mark"><Nfc size={19} /></span><span>NFC <b>Home</b></span></a><h2>Tap the physical world.<br /><em>Control your digital home.</em></h2></div><div className="footer-cta"><p>A privacy-first physical interface for your digital life.</p><a className="button primary" href="#top">Explore the concept <ArrowUpRight size={16} /></a></div></div><div className="footer-bottom"><span>Frontend concept demonstration · No real NFC, encryption, or hardware connection</span><span>Built around the idea: <b>Tap → Action</b></span></div></footer> }

function App() { useReveal(); return <><Nav /><main><Hero /><PrivacySection /><HowItWorks /><TapDemo /><FamilySection /><Routines /><VaultAndSmart /><FeatureGrid /></main><Footer /></> }

export default App

createRoot(document.getElementById('root')).render(<App />)
