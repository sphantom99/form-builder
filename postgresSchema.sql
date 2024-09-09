-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	uid serial4 NOT NULL,
	username varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT users_pkey PRIMARY KEY (uid),
	CONSTRAINT users_username_key UNIQUE (username)
);


-- public.forms definition

-- Drop table

-- DROP TABLE public.forms;

CREATE TABLE public.forms (
	uid serial4 NOT NULL,
	formshapejson jsonb NOT NULL,
	createdby int4 NOT NULL,
	datecreated timestamp DEFAULT now() NULL,
	datemodified timestamp DEFAULT now() NULL,
	modifiedby int4 NULL,
	CONSTRAINT forms_pkey PRIMARY KEY (uid),
	CONSTRAINT fk_createdby FOREIGN KEY (createdby) REFERENCES public.users(uid) ON DELETE CASCADE,
	CONSTRAINT fk_modifiedby FOREIGN KEY (modifiedby) REFERENCES public.users(uid) ON DELETE SET NULL
);


-- public.form_links definition

-- Drop table

-- DROP TABLE public.form_links;

CREATE TABLE public.form_links (
	formuid int4 NOT NULL,
	link text NOT NULL,
	CONSTRAINT form_links_pkey PRIMARY KEY (formuid, link),
	CONSTRAINT fk_formuid FOREIGN KEY (formuid) REFERENCES public.forms(uid) ON DELETE CASCADE
);


-- public.form_responses definition

-- Drop table

-- DROP TABLE public.form_responses;

CREATE TABLE public.form_responses (
	formuid int4 NOT NULL,
	responsejson jsonb NOT NULL,
	userid int4 NOT NULL,
	date_created date NOT NULL,
	CONSTRAINT fk_formresponses_formuid FOREIGN KEY (formuid) REFERENCES public.forms(uid) ON DELETE CASCADE,
	CONSTRAINT fk_formresponses_username FOREIGN KEY (userid) REFERENCES public.users(uid) ON DELETE CASCADE
);

INSERT INTO public.users (username, "password") VALUES ('admin', 'admin');