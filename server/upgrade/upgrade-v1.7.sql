ALTER TABLE Repository DROP allowTokenFreeAPI;
ALTER TABLE Repository_Audit DROP allowTokenFreeAPI;

ALTER TABLE Token DROP password;
ALTER TABLE Token DROP privateToken;
ALTER TABLE Token DROP deprecated;
ALTER TABLE Token_Audit DROP password;
ALTER TABLE Token_Audit DROP privateToken;
ALTER TABLE Token_Audit DROP deprecated;
ALTER TABLE Token ADD active boolean NOT NULL DEFAULT TRUE;
ALTER TABLE Token ADD managedBy varchar(255) NOT NULL DEFAULT 'All';
ALTER TABLE AccessRule ADD contextJson VARCHAR(255) DEFAULT null NULL;

CREATE TABLE AccessRule_Audit
(
  id bigint not null,
  REV bigint not null,
  REVTYPE smallint default null NULL,
  REVEND bigint default null NULL,
  REVEND_TSTMP timestamp default null NULL,
  diffJson text default null NULL,
  canedit boolean NOT NULL,
  contextJson varchar(255) default null NULL,
  contextMatchType varchar(255) default null NULL,
  keyMatchType varchar(255) default null NULL,
  matchValue varchar(255) default null NULL,
  priority int default null NULL,
  ruleTarget varchar(255) default null NULL,
  team bigint default null NULL,
  primary key (id, REV),
  constraint FKmleuvr9dmidmj2irgprmppijg
  foreign key (REV) references RevisionEntry (id),
  constraint FKhfvxctssq2074bv5q94bstvpt
  foreign key (REVEND) references RevisionEntry (id)
);

CREATE INDEX FKhfvxctssq2074bv5q94bstvpt ON AccessRule_Audit (REVEND);
CREATE INDEX FKmleuvr9dmidmj2irgprmppijg ON AccessRule_Audit (REV);

INSERT INTO RevisionEntry (id, timestamp) VALUES (1, 978307200000);
INSERT INTO AccessRule_Audit (id,  REV, REVTYPE, REVEND, REVEND_TSTMP, diffJson, canEdit, contextJson, contextMatchType, keyMatchType, matchValue, priority, ruleTarget, team)
  SELECT id, 1, 0, null, null, diffJson, canEdit, contextJson, contextMatchType, keyMatchType, matchValue, priority, ruleTarget, team FROM AccessRule;