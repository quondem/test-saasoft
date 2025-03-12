export interface Account {
  labels: Label[];
  type: 'local' | 'ldap',
  login: string;
  password: string;
  id: number;
}

export interface Label {
  text: string;
}
