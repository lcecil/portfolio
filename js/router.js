// Navigation Router
// @desc Accepts a route name and returns corresponding template.
function panelRouter (routeName) {
  switch (routeName) {
    case 'home':
      return $('#home-template').html();
    case 'information-architecture':
      return $('#information-architecture-template').html();
    case 'research-methods':
      return $('#research-methods-template').html();
    case 'visual-designs':
      return $('#visual-designs-template').html();
    case 'project-management':
      return $('#project-management-template').html();
    case 'development':
      return $('#development-template').html();
    default: return $('#home-template').html();
  }
}
