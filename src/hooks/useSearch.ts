import { useState, useMemo } from 'react';

export interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: 'page' | 'project' | 'blog';
  url: string;
}

// Mock data for search - in a real app, this would come from an API or database
const searchData: SearchResult[] = [
  {
    id: '1',
    title: 'About',
    content: 'Software Engineer Product Manager passionate about building innovative solutions experience education skills',
    type: 'page',
    url: '/about'
  },
  {
    id: '2',
    title: 'Projects',
    content: 'Portfolio of projects web development mobile apps artificial intelligence machine learning',
    type: 'page',
    url: '/projects'
  },
  {
    id: '3',
    title: 'Blog',
    content: 'Technical articles tutorials insights software development best practices programming tips',
    type: 'page',
    url: '/blog'
  },
  {
    id: '4',
    title: 'Getting Started with React',
    content: 'Learn the fundamentals of React including components state props hooks and modern development practices',
    type: 'blog',
    url: '/blog/getting-started-react'
  },
  {
    id: '5',
    title: 'Building Scalable APIs',
    content: 'Best practices for designing and implementing scalable REST APIs with Node.js and Express',
    type: 'blog',
    url: '/blog/scalable-apis'
  },
  {
    id: '6',
    title: 'E-commerce Platform',
    content: 'Full-stack e-commerce solution built with React TypeScript Node.js MongoDB payment integration',
    type: 'project',
    url: '/projects#ecommerce'
  },
  {
    id: '7',
    title: 'Task Management App',
    content: 'Mobile-first task management application with real-time collaboration features built with React Native',
    type: 'project',
    url: '/projects#taskmanager'
  }
];

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    const normalizedQuery = query.toLowerCase().trim();
    
    return searchData.filter(item => 
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.content.toLowerCase().includes(normalizedQuery)
    ).slice(0, 8); // Limit to 8 results
  }, [query]);

  const search = (searchQuery: string) => {
    setIsSearching(true);
    setQuery(searchQuery);
    
    // Simulate async search
    setTimeout(() => {
      setIsSearching(false);
    }, 200);
  };

  const clearSearch = () => {
    setQuery('');
    setIsSearching(false);
  };

  return {
    query,
    results,
    isSearching,
    search,
    clearSearch,
    hasResults: results.length > 0,
    isEmpty: query.trim() !== '' && results.length === 0
  };
};