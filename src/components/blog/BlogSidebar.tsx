import { useState, useEffect } from 'react';
import { BlogFilters } from '../../types/blog';

interface BlogSidebarProps {
  onFilterChange: (filters: BlogFilters) => void;
}

export default function BlogSidebar({ onFilterChange }: BlogSidebarProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedTag, setSelectedTag] = useState<string>();

  const categories = [
    { id: '1', name: 'Artificial Intelligence', slug: 'ai' },
    { id: '2', name: 'Web Development', slug: 'web-dev' },
    { id: '3', name: 'Cloud Computing', slug: 'cloud' },
    { id: '4', name: 'DevOps', slug: 'devops' },
  ];

  const tags = [
    'AI', 'LLM', 'React', 'AWS', 'Cloud', 'DevOps',
    'Python', 'JavaScript', 'Machine Learning'
  ];

  useEffect(() => {
    onFilterChange({
      category: selectedCategory,
      tag: selectedTag,
    });
  }, [selectedCategory, selectedTag, onFilterChange]);

  return (
    <aside className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => setSelectedCategory(category.slug)}
                className={`text-sm ${
                  selectedCategory === category.slug
                    ? 'text-primary font-medium'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTag === tag
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}