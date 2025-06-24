# 📦 echo-models

Shared TypeScript models for the ECHO app. Used by both the frontend and backend (CDK) to keep data contracts consistent and type-safe.

To add a new model and use it in other repos:

1. Create a new model file inside the `src/` directory, for example:

// src/team.ts  
export interface Team {  
  id: string;  
  name: string;  
  organization_id: string;  
  created_at: string;  
}

2. Export the model from `src/index.ts`:

export * from './team';

3. Bump the version using semantic versioning. For new models, use a minor version bump:

pnpm version minor

4. Commit and push the changes:

git add .  
git commit -m "Add Team model and bump version"  
git push  
git push --tags

5. In the consuming project (frontend or CDK), update the dependency:

pnpm add echo-models@git+ssh://git@github.com/alek-karp/echo-models.git#v1.3.0

Or if you're not pinned to a tag:

pnpm update echo-models

6. Import and use the model in your code:

import { Team } from 'echo-models';

const team: Team = {
  id: 'team1',
  name: 'Engineering',
  organization_id: 'org123',
  created_at: new Date().toISOString()
};

Suggested project structure:

/src  
  question.ts  
  response.ts  
  team.ts  
  index.ts  
package.json  
tsconfig.json

Only include pure TypeScript interfaces, enums, and constants. Avoid runtime logic or environment-specific code. Keep models backward-compatible when possible. Use Git tags to version reliably and avoid unexpected changes across teams.
