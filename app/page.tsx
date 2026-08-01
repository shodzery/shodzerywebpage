import { LoadingScreen } from '@/components/loading-screen'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Dashboard } from '@/components/dashboard'
import { Services } from '@/components/services'
import { Skills } from '@/components/skills'
import { Specialties } from '@/components/specialties'
import { Projects } from '@/components/projects'
import { WhyMe } from '@/components/why-me'
import { Workflow } from '@/components/workflow'
import { CtaBand } from '@/components/cta-band'

export default function Page() {
  return (
    <>
      <LoadingScreen />
      <main className="relative z-10">
        <Hero />
        <About />
        <Dashboard />
        <Services limit={6} showMoreLink />
        <Skills />
        <Specialties />
        <Projects limit={3} showMoreLink />
        <WhyMe />
        <Workflow />
        <CtaBand />
      </main>
    </>
  )
}
