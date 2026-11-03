import AnatomyNavbar from '@/components/anatomia/AnatomyNavbar'
import ToothExperience from '@/components/experience/ToothExperience'
import {
  ContactCTA,
  DentistsSection,
  ExpertiseSection,
  MaterialsSection,
  ProcessSection,
} from '@/components/anatomia/CommercialSections'

export default function AnatomiaPage() {
  return (
    <div className="bg-[#050505]">
      <AnatomyNavbar />
      <ToothExperience />
      <ExpertiseSection />
      <MaterialsSection />
      <ProcessSection />
      <DentistsSection />
      <ContactCTA />
    </div>
  )
}
