import ProjectTeamCard from "@/components/fragments/ProjectTeamCard";

export default function ProjectTeam() {
	return (
		<div className=" flex flex-wrap justify-around">
			<ProjectTeamCard
				title="Project Lead & Software Engineer"
				name="Ano Jumisa"
			/>
			<ProjectTeamCard
				title="Software Engineer"
				name="Fachmi Nur Julianto"
			/>
			<ProjectTeamCard
				title="Software Engineer"
				name="Mutiara Nafysah"
			/>
		</div>
	);
}
