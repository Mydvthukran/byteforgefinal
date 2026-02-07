"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Members.module.css";

import { a } from "framer-motion/client";

const members = [
	{
		name: "Ritu Rani",
		role: "Mentor",
		initials: "RR",
		image: "/assets/members/mentor.jpeg",
        isMentor: true,
	},
	{
		name: "Nishith Yadav",
		role: "Backend Developer",
		initials: "NY",
		image: "/assets/members/nishith.jpeg",
	},
	{
		name: "Akshat Bindal",
		role: "AI / ML Lead",
		initials: "AB",
		image: "/assets/members/akshat.jpeg",
	},
	{
		name: "Kushagra Sharma",
		role: "Full Stack Developer",
		initials: "KS",
		image: "/assets/members/kushagra.jpeg",
	},
	{
		name: "Manish Yadav",
		role: "Lead Developer",
		initials: "MY",
		image: "/assets/members/manish.jpeg",
		link: "https://my-pod-foliyo.vercel.app/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnI_kuB1g8ufeDSFR7enK2FxDfy_ny-0uhKXUyH3nTzTPOXBuhmhO7JG13SOU_aem_AAiaj9XZ-nWTFvR1oyOXqQ",
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
			data-is-mentor={member.isMentor ? "true" : "false"}
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
	const mentor = members.find(m => m.isMentor);
	const students = members.filter(m => !m.isMentor);

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

			{mentor && (
				<>
					<h3 className={styles.mentorLabel}>Mentor</h3>
					<div className={styles.mentorGrid}>
						<MemberCard member={mentor} index={0} />
					</div>
				</>
			)}

			{students.length > 0 && (
				<>
					<h3 className={styles.studentLabel}>Students</h3>
					<div className={styles.grid}>
						{students.map((member, i) => (
							<MemberCard key={member.name + i} member={member} index={i + 1} />
						))}
					</div>
				</>
			)}
		</section>
	);
}
