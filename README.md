# Dependencytrack plugin
Thanks for using our plugin created for retrieving OWASP's Dependencytrack information in Backstage. This plugin is still in development.

## Installation
Run this command from the `app` package directory:
```shell
yarn add @trimm/plugin-dependencytrack
```

## Configuration
### Configuring the service
Add config in `app-config.yaml`.
Integration:
```yaml
dependencytrack:
  baseUrl: <DEPENDENCYTRACK_INSTANCE_URL>
```
Proxy:
```yaml
proxy:
  '/dependencytrack':
    target: <DEPENDENCYTRACK_API_URL>  
    allowedMethods: ['GET']
    headers:
      X-Api-Key: '<DEPENDENCYTRACK_API_KEY>'
```

Don't forget to replace the placeholders identified by the carets.

### Add cards to overview tab
```tsx
// packages\app\src\components\catalog\EntityPage.tsx
import { EntityDependencytrackSummaryCard, EntityDependencytrackFindingCard, isDependencytrackAvailable } from '@trimm/plugin-dependencytrack';

// In the overviewContent. You can add one or both.

// Metrics card
<EntitySwitch>
    <EntitySwitch.Case if={isDependencytrackAvailable}>
    <Grid item md={6}>
        <EntityDependencytrackSummaryCard/>
    </Grid>
    </EntitySwitch.Case>
</EntitySwitch>

// Findings card
<EntitySwitch>
    <EntitySwitch.Case if={isDependencytrackAvailable}>
    <Grid item md={12}>
        <EntityDependencytrackFindingCard/>
    </Grid>
    </EntitySwitch.Case>
</EntitySwitch>
```

### Add to catalog-info.yaml
Add `dependencytrack/project-id` to your `catalog-info.yaml`:
```yaml
# Example catalog-info.yaml entity definition file
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  # ...
  annotations:
  dependencytrack/project-id: <project-id> # e63d5397-5e9e-494a-4755-368c2b1dc446
```
