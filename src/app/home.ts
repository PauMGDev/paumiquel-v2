import { Component } from '@angular/core';

import { copy } from './content';
import { SITE_URL, applySeo } from './seo';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly hero = copy.home.hero;
  protected readonly stack = copy.home.stack;
  protected readonly experience = copy.home.experience;
  protected readonly education = copy.home.education;
  protected readonly certification = copy.home.certification;
  protected readonly projects = copy.home.projects;

  constructor() {
    applySeo({
      path: '',
      title: copy.home.seo.title,
      description: copy.home.seo.description,
      image: '/og/home.png',
      imageAlt: copy.home.seo.imageAlt,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Pau Miquel',
        jobTitle: 'Desarrollador full stack',
        url: SITE_URL,
        knowsAbout: ['TypeScript', 'Angular', 'Node.js', 'PostgreSQL', 'IA aplicada'],
      },
    });
  }
}
