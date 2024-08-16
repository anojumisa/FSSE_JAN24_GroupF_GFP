import TopSection from "@/components/layouts/About_Page/TopSection";
import DividerSection from "@/components/layouts/About_Page/DividerSection";
import DividerSectionShort from "@/components/layouts/About_Page/DividerSectionShort";
import GreenMovement_right from "@/components/layouts/About_Page/GreenMovement_right";
import GreenMovement_left from "@/components/layouts/About_Page/GreenMovement_left";
import ProfileSectionLeft from "@/components/layouts/About_Page/ProfileSection_left";
import ProfileSectionRight from "@/components/layouts/About_Page/ProfileSection_right";
import Footer from "@/components/layouts/Landing_Page/Footer";
import MiniNavbar from "@/components/layouts/About_Page/MiniNavbar";

export default function About() {
	return (
		<>
			<MiniNavbar />
			<TopSection />
			<DividerSection
				lineOne="LocalBites is more than just a marketplace."
				lineTwo="It's a movement"
				lineThree="It's about celebrating local cultures, supporting sustainable practices, and creating lasting memories."
			/>
			<GreenMovement_right
				title="The Traveler's Companion"
				description="Position LocalBites as the essential companion for every adventure. Highlight the idea of bringing a piece of a destination home, not just as a souvenir but as a culinary treasure."
				movement="Taste the world, one bite at a time."
				image="/about/companion.png"
				checklist_one="Curated Selections: Offer carefully curated product selections for each destination, highlighting iconic and unique local delicacies."
				checklist_two="Personalized Recommendations: Utilize user data and preferences to suggest products based on individual tastes and travel itineraries."
				checklist_three="Gift Guides: Create gift guides for different types of travelers (adventurous foodies, wellness enthusiasts, etc.) to make gift-giving easier and more meaningful."
				checklist_four="Storytelling: Weave captivating narratives around each product, connecting it to the local culture and history."
			/>
			<GreenMovement_left
				title="Artisan Spotlight"
				description="Create a platform to showcase the stories of the artisans behind the products. This humanizes the brand and builds emotional connections with customers."
				movement="Discover the heart behind the flavor."
				image="/about/shopping.png"
				checklist_one="Artisan Profiles: Create detailed profiles for each artisan, including their story, passion, and the inspiration behind their creations."
				checklist_two="Behind-the-Scenes Content: Share videos, photos, and blog posts that showcase the artisan's craft and the process of making their products."
				checklist_three="Live Q&A Sessions: Host live Q&A sessions with artisans to foster direct interaction with customers."
				checklist_four="Limited Edition Collaborations: Partner with artisans on exclusive, limited-edition products to create a sense of urgency and exclusivity."
			/>
			<GreenMovement_right
				title="Sustainability as a Lifestyle"
				description="Emphasize that choosing LocalBites is a conscious decision to live a more sustainable life. Explore partnerships with environmental organizations to reinforce the brand's commitment."
				movement="Indulge your taste buds, nourish the planet."
				image="/about/bicycle_delivery.png"
				checklist_one="Transparent Supply Chain: Clearly communicate the brand's commitment to sustainable sourcing and production practices."
				checklist_two="Eco-Friendly Packaging: Invest in innovative, eco-friendly packaging materials and designs."
				checklist_three="Carbon Offset Initiatives: Partner with carbon offset programs to neutralize the environmental impact of shipping."
				checklist_four="Educational Content: Share informative articles and blog posts about sustainable living and the importance of reducing food waste."
			/>
			<GreenMovement_left
				title="Community Building"
				description="Foster a sense of community among LocalBites customers by creating online forums or social media groups where they can share their experiences and recommendations."
				movement="Share the joy, savor the taste."
				image="/about/sustainability.png"
				checklist_one="Online Forums: Create a platform for customers to share their experiences, ask questions, and connect with other food lovers."
				checklist_two="Social Media Engagement: Encourage user-generated content by running contests, challenges, and giveaways."
				checklist_three="Loyalty Programs: Reward repeat customers with exclusive perks and early access to new products."
				checklist_four="Local Events: Organize food festivals, cooking classes, and pop-up shops to bring the LocalBites community together offline."
			/>

			<div id="meet-the-team"></div>
			<DividerSectionShort
				lineOne="Let's meet the Team"
				lineTwo=""
				lineThree=""
			/>

			<ProfileSectionLeft
				name="Ano Jumisa"
				role="Project Lead & Software Engineer"
				description="Meet Ano, the visionary behind LocalBites' digital infrastructure. Ano is passionate about sustainable technology and believes that software can be a force for good. His code is as clean and efficient as a pristine forest. He's the one who ensures that every line of code contributes to a smaller digital footprint, optimizing performance to reduce energy consumption. Ano's dream is to create a platform that not only connects people with delicious treats but also minimizes the environmental impact of online commerce."
				image="/Ano.png"
			/>
			<ProfileSectionRight
				name="Fachmi Nur Julianto"
				role="Software Engineer"
				description="Fachmi is a numbers wizard with a heart for the planet. His analytical mind is constantly calculating ways to make LocalBites more efficient and eco-friendly. From optimizing delivery routes to minimizing data storage, Ben is always on the lookout for opportunities to reduce waste. He's like a sustainability detective, uncovering hidden inefficiencies and turning them into green gold. Ben's goal is to create a system that not only delights customers but also respects the Earth's resources."
				image="/Fachmi.png"
			/>
			<ProfileSectionLeft
				name="Mutiara Nafysah"
				role="Software Engineer"
				description="Mutiara is a coding alchemist, transforming complex problems into elegant solutions. Inspired by the intricate patterns found in nature, Mutiara's code is both beautiful and functional. She believes that technology should mimic the harmony found in ecosystems. Mutiara is the guardian of LocalBites' user experience, ensuring that every interaction is as smooth and intuitive as a gentle breeze. Her ultimate aim is to create a digital experience that is not only enjoyable but also leaves a positive impact on the user and the planet."
				image="/mutiara.png"
			/>
			<Footer />
		</>
	);
}
