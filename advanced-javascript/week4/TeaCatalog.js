class TeaCatalog {
  constructor(teas) {
    this.teas = teas;
  }

  search(query) {
    // Return teas where name includes query (case-insensitive)
    return this.teas.filter((tea) =>
      tea.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  filterByType(type) {
    return this.teas.filter((tea) => tea.type === type);
  }
}

export { TeaCatalog };
