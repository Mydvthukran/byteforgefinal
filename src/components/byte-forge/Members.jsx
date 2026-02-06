"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Members.module.css";

const members = [
	{
		name: "Nishit Yadav",
		role: "Lead Developer",
		initials: "NY",
		image: "/assets/members/nishit.jpg",
		link: "https://example.com/nishit",
	},
	{
		name: "Akshit",
		role: "AI / ML Lead",
		initials: "ML",
		image: "/assets/members/akshit.jpg",
		link: "https://example.com/akshit",
	},
	{
		name: "Nishit Yadav",
		role: "Community Lead",
		initials: "RT",
		image: "/assets/members/community.jpg",
		link: "https://example.com/community",
	},
	{
		name: "Akshit",
		role: "Backend Lead",
		initials: "DS",
		image:
			"data:image/jpeg;base64,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",
		link: "https://example.com/backend",
	},
	{
		name: "Manish Yadav",
		role: "Frontend Lead",
		initials: "my",
		image: "/assets/members/manish.jpg",
		link: "https://example.com/manish",
	},
  {
		name: "Manish Yadav",
		role: "Degisn Lead",
		initials: "my",
		image: "/assets/members/manish.jpg",
		link: "https://example.com/manish",
	},
];

function MemberCard({ member, index }) {
	const cardRef = useRef(null);
	const [showImage, setShowImage] = useState(Boolean(member.image));

	const handleMouseMove = (e) => {
		const card = cardRef.current;
		if (!card) return;
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		const rotateX = ((y - centerY) / centerY) * -8;
		const rotateY = ((x - centerX) / centerX) * 8;

		card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
		card.style.setProperty("--glow-x", `${x}px`);
		card.style.setProperty("--glow-y", `${y}px`);
	};

	const handleMouseLeave = () => {
		const card = cardRef.current;
		if (!card) return;
		card.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
	};

	return (
		<motion.a
			ref={cardRef}
			className={styles.card}
			href={member.link || "#"}
			target="_blank"
			rel="noopener noreferrer"
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			viewport={{ once: true }}
		>
			<div className={styles.cardGlow} />
			<div className={styles.cardBorder} />
			<div className={styles.avatar}>
				{showImage && member.image ? (
					<img
						src={member.image}
						alt={member.name}
						className={styles.avatarImg}
						onError={() => setShowImage(false)}
					/>
				) : (
					<span className={styles.initials}>{member.initials}</span>
				)}
			</div>
			<h3 className={styles.name}>{member.name}</h3>
			<p className={styles.role}>{member.role}</p>
			<div className={styles.cardLine} />
		</motion.a>
	);
}

export default function Members() {
	return (
		<section className={styles.members} id="members">
			<motion.div
				className={styles.header}
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true, margin: "-100px" }}
			>
				<div className={styles.labelRow}>
					<span className={styles.dot} />
					<p className={styles.label}>TEAM</p>
				</div>
				<h2 className={styles.heading}>Meet our leads</h2>
			</motion.div>

			<div className={styles.grid}>
				{members.map((member, i) => (
					<MemberCard key={member.name + i} member={member} index={i} />
				))}
			</div>
		</section>
	);
}
