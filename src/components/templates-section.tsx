import React from 'react'
import Card from './card'

// Dados de exemplo dos templates
const templates = [
  {
    id: 1,
    title: "Gray",
    description: "Modern SaaS landing page with stunning animations and clean design",
    image: "/templates/gray.png",
    link: "/templates/gray",
    price: "$9",
    category: "SaaS",
    technologies: ["Next.js", "React", "Tailwind CSS"]
  },
]

export default function TemplatesSection() {
  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Templates Grid */}
        <div id="archive-container" className="max-w-[380px] mx-auto min-[861px]:max-w-[790px] min-[1271px]:max-w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {templates.map((template, index) => (
              <Card
                key={template.id}
                title={template.title}
                description={template.description}
                image={template.image}
                link={template.link}
                price={template.price}
                technologies={template.technologies}
                className={`
                  ${index < 2 ? '[&:nth-child(-n+2)]:-order-2' : ''}
                  ${index >= 2 && index < 5 ? '[&:nth-child(n+3):nth-child(-n+5)]:-order-1' : ''}
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}