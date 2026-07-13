export const generateIconDataUrls = (): string[] => {
  const icons = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#3B82F6"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8" stroke="white" stroke-width="2"/></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#E15B00"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M9 12l2 2 4-4" stroke="white" stroke-width="2"/></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#10B981"><circle cx="12" cy="12" r="9" stroke="white" stroke-width="2"/><path d="M12 7v10" stroke="white" stroke-width="2"/></svg>`
  ];

  return icons.map(svg => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`);
};
