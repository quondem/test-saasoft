export interface Account {
    labels: Label[];
    type: 'local' | 'ldap',
    login: string;
    password: string;
}

export interface Label {
    text: string;
}