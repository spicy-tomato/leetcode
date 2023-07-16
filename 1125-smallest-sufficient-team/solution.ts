type SortedSkill = { skill: string; indices: number[] };

function getRequiredSkillMap(
  requiredSkills: string[]
): Record<string, number[]> {
  return requiredSkills.reduce<Record<string, number[]>>((acc, curr) => {
    acc[curr] = [];
    return acc;
  }, {});
}

function getSortedRequiredSkill(
  requiredSkillMap: Record<string, number[]>,
  people: string[][]
): SortedSkill[] {
  const arr = Object.entries(requiredSkillMap).map(([skill, indices]) => ({
    skill,
    indices,
  }));

  arr.sort((a, b) => (a.indices.length < b.indices.length ? -1 : 1));

  for (let i = 0; i < arr.length; i++) {
    arr[i].indices.sort((a, b) =>
      people[a].length < people[b].length ? 1 : -1
    );
  }

  return arr;
}

function getEmptyMap(skills: string[]): Record<string, number> {
  return skills.reduce<Record<string, number>>((acc, curr) => {
    acc[curr] = 0;
    return acc;
  }, {});
}

function solve(
  idx: number,
  selected: number[],
  fillMap: Record<string, number>,
  sortedRequireSkills: SortedSkill[],
  people: string[][]
): number[] {
  if (idx >= sortedRequireSkills.length) {
    return [...selected];
  }

  const skill = sortedRequireSkills[idx];

  // skip
  if (fillMap[skill.skill]) {
    const r = solve(idx + 1, selected, fillMap, sortedRequireSkills, people);
    return r;
  }

  let res: number[] = [];

  for (let i = 0; i < skill.indices.length; i++) {
    const personIdx = skill.indices[i];
    const currPersonSkills = people[personIdx];

    selected.push(personIdx);
    for (let j = 0; j < people[personIdx].length; j++) {
      fillMap[currPersonSkills[j]]++;
    }
    const s = solve(idx + 1, selected, fillMap, sortedRequireSkills, people);
    selected.pop();
    for (let j = 0; j < people[personIdx].length; j++) {
      fillMap[currPersonSkills[j]]--;
    }

    if (res.length === 0 || s.length < res.length) {
      res = s;
    }
  }

  return res;
}

function smallestSufficientTeam(
  requiredSkills: string[],
  people: string[][]
): number[] {
  const requiredSkillMap = getRequiredSkillMap(requiredSkills);

  for (let i = 0; i < people.length; i++) {
    const skills = people[i];
    for (let j = 0; j < skills.length; j++) {
      const skill = skills[j];
      if (!requiredSkillMap[skill]) continue;
      requiredSkillMap[skill].push(i);
    }
  }

  const sortedRequireSkills = getSortedRequiredSkill(requiredSkillMap, people);

  return solve(0, [], getEmptyMap(requiredSkills), sortedRequireSkills, people);
}

const req_skills = [
    'mli',
    'krvswogyyanvwhd',
    'jzuhxeqqvkuac',
    'gmwyepsq',
    'nfgilvs',
    'zyqubsiify',
    'pbmmtjcruigt',
  ],
  people = [
    ['pbmmtjcruigt'],
    ['jzuhxeqqvkuac', 'zyqubsiify', 'pbmmtjcruigt'],
    ['krvswogyyanvwhd'],
    [],
    ['mli', 'krvswogyyanvwhd', 'pbmmtjcruigt'],
    [],
    ['mli', 'pbmmtjcruigt'],
    [],
    ['mli', 'pbmmtjcruigt'],
    ['pbmmtjcruigt'],
    ['krvswogyyanvwhd', 'gmwyepsq', 'nfgilvs'],
    ['mli'],
    ['krvswogyyanvwhd', 'jzuhxeqqvkuac', 'gmwyepsq'],
    ['jzuhxeqqvkuac', 'pbmmtjcruigt'],
    [],
    [],
    [],
    ['zyqubsiify'],
    ['krvswogyyanvwhd', 'pbmmtjcruigt'],
    ['krvswogyyanvwhd', 'jzuhxeqqvkuac', 'nfgilvs'],
    [],
    ['krvswogyyanvwhd'],
    ['zyqubsiify'],
    ['mli', 'krvswogyyanvwhd', 'jzuhxeqqvkuac'],
    ['pbmmtjcruigt'],
    ['pbmmtjcruigt'],
    ['zyqubsiify'],
    ['mli', 'nfgilvs'],
    ['mli', 'jzuhxeqqvkuac', 'zyqubsiify'],
    ['mli', 'pbmmtjcruigt'],
    ['mli'],
    ['mli', 'jzuhxeqqvkuac'],
    ['mli', 'jzuhxeqqvkuac', 'pbmmtjcruigt'],
    ['jzuhxeqqvkuac'],
    ['mli'],
    ['mli'],
    ['mli'],
    [],
    ['krvswogyyanvwhd', 'pbmmtjcruigt'],
    [],
    ['jzuhxeqqvkuac'],
    [],
    ['mli'],
    ['jzuhxeqqvkuac'],
    ['jzuhxeqqvkuac', 'zyqubsiify', 'pbmmtjcruigt'],
    ['mli', 'zyqubsiify'],
    ['mli'],
    ['mli', 'zyqubsiify'],
    ['krvswogyyanvwhd'],
    [],
    ['jzuhxeqqvkuac'],
    [],
    ['zyqubsiify'],
    [],
    ['krvswogyyanvwhd', 'gmwyepsq', 'zyqubsiify'],
    ['krvswogyyanvwhd', 'zyqubsiify'],
    ['krvswogyyanvwhd', 'pbmmtjcruigt'],
    ['mli'],
    ['mli', 'zyqubsiify'],
    [],
  ];

const res = smallestSufficientTeam(req_skills, people);

console.log(res);

// [27,44,54]
