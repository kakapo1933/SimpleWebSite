--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Postgres.app)
-- Dumped by pg_dump version 17.4 (Postgres.app)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: donation; Type: SCHEMA; Schema: -; Owner: Your_name
--

CREATE SCHEMA donation;


ALTER SCHEMA donation OWNER TO Your_name;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: donation; Owner: Your_name
--

CREATE TABLE donation._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE donation._prisma_migrations OWNER TO Your_name;

--
-- Name: organizations; Type: TABLE; Schema: donation; Owner: Your_name
--

CREATE TABLE donation.organizations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    organization_type character varying(50),
    tax_id character varying(50),
    year_established integer,
    contact_information jsonb,
    status character varying(20) DEFAULT 'active'::character varying,
    registration_date date DEFAULT CURRENT_DATE,
    website character varying(255),
    social_media jsonb,
    notes text
);


ALTER TABLE donation.organizations OWNER TO Your_name;

--
-- Name: organizations_organization_id_seq; Type: SEQUENCE; Schema: donation; Owner: Your_name
--

CREATE SEQUENCE donation.organizations_organization_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE donation.organizations_organization_id_seq OWNER TO Your_name;

--
-- Name: organizations_organization_id_seq; Type: SEQUENCE OWNED BY; Schema: donation; Owner: Your_name
--

ALTER SEQUENCE donation.organizations_organization_id_seq OWNED BY donation.organizations.id;


--
-- Name: organizations id; Type: DEFAULT; Schema: donation; Owner: Your_name
--

ALTER TABLE ONLY donation.organizations ALTER COLUMN id SET DEFAULT nextval('donation.organizations_organization_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: donation; Owner: Your_name
--

COPY donation._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
3c1f800a-5ecb-4daf-a520-e85098e75425	a4b8ddcac4c3ef8e9b9d5b9c6f895994ce0f88e234b0d7e2a9ad40ba95397a44	2025-03-08 17:43:42.607067+08	0_init		\N	2025-03-08 17:43:42.607067+08	0
\.


--
-- Data for Name: organizations; Type: TABLE DATA; Schema: donation; Owner: Your_name
--

COPY donation.organizations (id, name, organization_type, tax_id, year_established, contact_information, status, registration_date, website, social_media, notes) FROM stdin;
1	NGO Organization 1	Environmental	TAX000001	1999	{"email": "contact1@ngo1.org", "phone": "+886169397448", "address": "1 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo1.org	{"twitter": "https://twitter.com/ngo1", "facebook": "https://facebook.com/ngo1", "instagram": "https://instagram.com/ngo1"}	Sample NGO organization 1 description
2	NGO Organization 2	Educational	TAX000002	2005	{"email": "contact2@ngo2.org", "phone": "+8869349810", "address": "2 NGO Street, Taipei, Taiwan"}	inactive	2025-03-10	https://www.ngo2.org	{"twitter": "https://twitter.com/ngo2", "facebook": "https://facebook.com/ngo2", "instagram": "https://instagram.com/ngo2"}	Sample NGO organization 2 description
3	NGO Organization 3	Social Services	TAX000003	1958	{"email": "contact3@ngo3.org", "phone": "+886653843931", "address": "3 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo3.org	{"twitter": "https://twitter.com/ngo3", "facebook": "https://facebook.com/ngo3", "instagram": "https://instagram.com/ngo3"}	Sample NGO organization 3 description
4	NGO Organization 4	Social Services	TAX000004	1975	{"email": "contact4@ngo4.org", "phone": "+886268312785", "address": "4 NGO Street, Taipei, Taiwan"}	inactive	2025-03-10	https://www.ngo4.org	{"twitter": "https://twitter.com/ngo4", "facebook": "https://facebook.com/ngo4", "instagram": "https://instagram.com/ngo4"}	Sample NGO organization 4 description
5	NGO Organization 5	Environmental	TAX000005	1952	{"email": "contact5@ngo5.org", "phone": "+886217226444", "address": "5 NGO Street, Taipei, Taiwan"}	inactive	2025-03-10	https://www.ngo5.org	{"twitter": "https://twitter.com/ngo5", "facebook": "https://facebook.com/ngo5", "instagram": "https://instagram.com/ngo5"}	Sample NGO organization 5 description
6	NGO Organization 6	Environmental	TAX000006	1959	{"email": "contact6@ngo6.org", "phone": "+886428527247", "address": "6 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo6.org	{"twitter": "https://twitter.com/ngo6", "facebook": "https://facebook.com/ngo6", "instagram": "https://instagram.com/ngo6"}	Sample NGO organization 6 description
7	NGO Organization 7	Social Services	TAX000007	1975	{"email": "contact7@ngo7.org", "phone": "+886671200401", "address": "7 NGO Street, Taipei, Taiwan"}	inactive	2025-03-10	https://www.ngo7.org	{"twitter": "https://twitter.com/ngo7", "facebook": "https://facebook.com/ngo7", "instagram": "https://instagram.com/ngo7"}	Sample NGO organization 7 description
8	NGO Organization 8	Human Rights	TAX000008	1975	{"email": "contact8@ngo8.org", "phone": "+886300099238", "address": "8 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo8.org	{"twitter": "https://twitter.com/ngo8", "facebook": "https://facebook.com/ngo8", "instagram": "https://instagram.com/ngo8"}	Sample NGO organization 8 description
9	NGO Organization 9	Social Services	TAX000009	1966	{"email": "contact9@ngo9.org", "phone": "+886692102472", "address": "9 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo9.org	{"twitter": "https://twitter.com/ngo9", "facebook": "https://facebook.com/ngo9", "instagram": "https://instagram.com/ngo9"}	Sample NGO organization 9 description
10	NGO Organization 10	Environmental	TAX000010	2001	{"email": "contact10@ngo10.org", "phone": "+886843717476", "address": "10 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo10.org	{"twitter": "https://twitter.com/ngo10", "facebook": "https://facebook.com/ngo10", "instagram": "https://instagram.com/ngo10"}	Sample NGO organization 10 description
11	NGO Organization 11	Social Services	TAX000011	1980	{"email": "contact11@ngo11.org", "phone": "+886101912685", "address": "11 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo11.org	{"twitter": "https://twitter.com/ngo11", "facebook": "https://facebook.com/ngo11", "instagram": "https://instagram.com/ngo11"}	Sample NGO organization 11 description
12	NGO Organization 12	Social Services	TAX000012	2022	{"email": "contact12@ngo12.org", "phone": "+886433273123", "address": "12 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo12.org	{"twitter": "https://twitter.com/ngo12", "facebook": "https://facebook.com/ngo12", "instagram": "https://instagram.com/ngo12"}	Sample NGO organization 12 description
13	NGO Organization 13	Educational	TAX000013	1985	{"email": "contact13@ngo13.org", "phone": "+886930081905", "address": "13 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo13.org	{"twitter": "https://twitter.com/ngo13", "facebook": "https://facebook.com/ngo13", "instagram": "https://instagram.com/ngo13"}	Sample NGO organization 13 description
14	NGO Organization 14	Educational	TAX000014	2017	{"email": "contact14@ngo14.org", "phone": "+886709687286", "address": "14 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo14.org	{"twitter": "https://twitter.com/ngo14", "facebook": "https://facebook.com/ngo14", "instagram": "https://instagram.com/ngo14"}	Sample NGO organization 14 description
15	NGO Organization 15	Educational	TAX000015	1960	{"email": "contact15@ngo15.org", "phone": "+886557619037", "address": "15 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo15.org	{"twitter": "https://twitter.com/ngo15", "facebook": "https://facebook.com/ngo15", "instagram": "https://instagram.com/ngo15"}	Sample NGO organization 15 description
16	NGO Organization 16	Social Services	TAX000016	1960	{"email": "contact16@ngo16.org", "phone": "+886478856987", "address": "16 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo16.org	{"twitter": "https://twitter.com/ngo16", "facebook": "https://facebook.com/ngo16", "instagram": "https://instagram.com/ngo16"}	Sample NGO organization 16 description
17	NGO Organization 17	Human Rights	TAX000017	2019	{"email": "contact17@ngo17.org", "phone": "+886137056716", "address": "17 NGO Street, Taipei, Taiwan"}	inactive	2025-03-10	https://www.ngo17.org	{"twitter": "https://twitter.com/ngo17", "facebook": "https://facebook.com/ngo17", "instagram": "https://instagram.com/ngo17"}	Sample NGO organization 17 description
18	NGO Organization 18	Human Rights	TAX000018	1998	{"email": "contact18@ngo18.org", "phone": "+886493418344", "address": "18 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo18.org	{"twitter": "https://twitter.com/ngo18", "facebook": "https://facebook.com/ngo18", "instagram": "https://instagram.com/ngo18"}	Sample NGO organization 18 description
19	NGO Organization 19	Educational	TAX000019	1954	{"email": "contact19@ngo19.org", "phone": "+886694887961", "address": "19 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo19.org	{"twitter": "https://twitter.com/ngo19", "facebook": "https://facebook.com/ngo19", "instagram": "https://instagram.com/ngo19"}	Sample NGO organization 19 description
20	NGO Organization 20	Environmental	TAX000020	2015	{"email": "contact20@ngo20.org", "phone": "+886333911994", "address": "20 NGO Street, Taipei, Taiwan"}	inactive	2025-03-10	https://www.ngo20.org	{"twitter": "https://twitter.com/ngo20", "facebook": "https://facebook.com/ngo20", "instagram": "https://instagram.com/ngo20"}	Sample NGO organization 20 description
21	NGO Organization 21	Educational	TAX000021	1967	{"email": "contact21@ngo21.org", "phone": "+886807119238", "address": "21 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo21.org	{"twitter": "https://twitter.com/ngo21", "facebook": "https://facebook.com/ngo21", "instagram": "https://instagram.com/ngo21"}	Sample NGO organization 21 description
22	NGO Organization 22	Educational	TAX000022	1975	{"email": "contact22@ngo22.org", "phone": "+886597433299", "address": "22 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo22.org	{"twitter": "https://twitter.com/ngo22", "facebook": "https://facebook.com/ngo22", "instagram": "https://instagram.com/ngo22"}	Sample NGO organization 22 description
23	NGO Organization 23	Human Rights	TAX000023	1966	{"email": "contact23@ngo23.org", "phone": "+886884396346", "address": "23 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo23.org	{"twitter": "https://twitter.com/ngo23", "facebook": "https://facebook.com/ngo23", "instagram": "https://instagram.com/ngo23"}	Sample NGO organization 23 description
24	NGO Organization 24	Human Rights	TAX000024	1985	{"email": "contact24@ngo24.org", "phone": "+886590061468", "address": "24 NGO Street, Taipei, Taiwan"}	inactive	2025-03-10	https://www.ngo24.org	{"twitter": "https://twitter.com/ngo24", "facebook": "https://facebook.com/ngo24", "instagram": "https://instagram.com/ngo24"}	Sample NGO organization 24 description
25	NGO Organization 25	Environmental	TAX000025	1962	{"email": "contact25@ngo25.org", "phone": "+886779197758", "address": "25 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo25.org	{"twitter": "https://twitter.com/ngo25", "facebook": "https://facebook.com/ngo25", "instagram": "https://instagram.com/ngo25"}	Sample NGO organization 25 description
26	NGO Organization 26	Human Rights	TAX000026	1975	{"email": "contact26@ngo26.org", "phone": "+886339645600", "address": "26 NGO Street, Taipei, Taiwan"}	inactive	2025-03-10	https://www.ngo26.org	{"twitter": "https://twitter.com/ngo26", "facebook": "https://facebook.com/ngo26", "instagram": "https://instagram.com/ngo26"}	Sample NGO organization 26 description
27	NGO Organization 27	Healthcare	TAX000027	2014	{"email": "contact27@ngo27.org", "phone": "+886979704809", "address": "27 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo27.org	{"twitter": "https://twitter.com/ngo27", "facebook": "https://facebook.com/ngo27", "instagram": "https://instagram.com/ngo27"}	Sample NGO organization 27 description
28	NGO Organization 28	Educational	TAX000028	2005	{"email": "contact28@ngo28.org", "phone": "+886648734338", "address": "28 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo28.org	{"twitter": "https://twitter.com/ngo28", "facebook": "https://facebook.com/ngo28", "instagram": "https://instagram.com/ngo28"}	Sample NGO organization 28 description
29	NGO Organization 29	Environmental	TAX000029	1993	{"email": "contact29@ngo29.org", "phone": "+886643484770", "address": "29 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo29.org	{"twitter": "https://twitter.com/ngo29", "facebook": "https://facebook.com/ngo29", "instagram": "https://instagram.com/ngo29"}	Sample NGO organization 29 description
30	NGO Organization 30	Human Rights	TAX000030	1977	{"email": "contact30@ngo30.org", "phone": "+886168131688", "address": "30 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo30.org	{"twitter": "https://twitter.com/ngo30", "facebook": "https://facebook.com/ngo30", "instagram": "https://instagram.com/ngo30"}	Sample NGO organization 30 description
31	NGO Organization 31	Educational	TAX000031	1994	{"email": "contact31@ngo31.org", "phone": "+886848099977", "address": "31 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo31.org	{"twitter": "https://twitter.com/ngo31", "facebook": "https://facebook.com/ngo31", "instagram": "https://instagram.com/ngo31"}	Sample NGO organization 31 description
32	NGO Organization 32	Environmental	TAX000032	2007	{"email": "contact32@ngo32.org", "phone": "+886572422506", "address": "32 NGO Street, Taipei, Taiwan"}	inactive	2025-03-10	https://www.ngo32.org	{"twitter": "https://twitter.com/ngo32", "facebook": "https://facebook.com/ngo32", "instagram": "https://instagram.com/ngo32"}	Sample NGO organization 32 description
33	NGO Organization 33	Social Services	TAX000033	2022	{"email": "contact33@ngo33.org", "phone": "+886475453770", "address": "33 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo33.org	{"twitter": "https://twitter.com/ngo33", "facebook": "https://facebook.com/ngo33", "instagram": "https://instagram.com/ngo33"}	Sample NGO organization 33 description
34	NGO Organization 34	Human Rights	TAX000034	1967	{"email": "contact34@ngo34.org", "phone": "+886510823183", "address": "34 NGO Street, Taipei, Taiwan"}	inactive	2025-03-10	https://www.ngo34.org	{"twitter": "https://twitter.com/ngo34", "facebook": "https://facebook.com/ngo34", "instagram": "https://instagram.com/ngo34"}	Sample NGO organization 34 description
35	NGO Organization 35	Educational	TAX000035	1975	{"email": "contact35@ngo35.org", "phone": "+886664125896", "address": "35 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo35.org	{"twitter": "https://twitter.com/ngo35", "facebook": "https://facebook.com/ngo35", "instagram": "https://instagram.com/ngo35"}	Sample NGO organization 35 description
36	NGO Organization 36	Educational	TAX000036	1991	{"email": "contact36@ngo36.org", "phone": "+886675350442", "address": "36 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo36.org	{"twitter": "https://twitter.com/ngo36", "facebook": "https://facebook.com/ngo36", "instagram": "https://instagram.com/ngo36"}	Sample NGO organization 36 description
37	NGO Organization 37	Social Services	TAX000037	1994	{"email": "contact37@ngo37.org", "phone": "+886522637364", "address": "37 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo37.org	{"twitter": "https://twitter.com/ngo37", "facebook": "https://facebook.com/ngo37", "instagram": "https://instagram.com/ngo37"}	Sample NGO organization 37 description
38	NGO Organization 38	Human Rights	TAX000038	1993	{"email": "contact38@ngo38.org", "phone": "+886552203876", "address": "38 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo38.org	{"twitter": "https://twitter.com/ngo38", "facebook": "https://facebook.com/ngo38", "instagram": "https://instagram.com/ngo38"}	Sample NGO organization 38 description
39	NGO Organization 39	Educational	TAX000039	1959	{"email": "contact39@ngo39.org", "phone": "+886391601254", "address": "39 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo39.org	{"twitter": "https://twitter.com/ngo39", "facebook": "https://facebook.com/ngo39", "instagram": "https://instagram.com/ngo39"}	Sample NGO organization 39 description
40	NGO Organization 40	Healthcare	TAX000040	2019	{"email": "contact40@ngo40.org", "phone": "+886594093430", "address": "40 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo40.org	{"twitter": "https://twitter.com/ngo40", "facebook": "https://facebook.com/ngo40", "instagram": "https://instagram.com/ngo40"}	Sample NGO organization 40 description
41	NGO Organization 41	Environmental	TAX000041	1952	{"email": "contact41@ngo41.org", "phone": "+886633218951", "address": "41 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo41.org	{"twitter": "https://twitter.com/ngo41", "facebook": "https://facebook.com/ngo41", "instagram": "https://instagram.com/ngo41"}	Sample NGO organization 41 description
42	NGO Organization 42	Environmental	TAX000042	2018	{"email": "contact42@ngo42.org", "phone": "+886902362515", "address": "42 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo42.org	{"twitter": "https://twitter.com/ngo42", "facebook": "https://facebook.com/ngo42", "instagram": "https://instagram.com/ngo42"}	Sample NGO organization 42 description
43	NGO Organization 43	Environmental	TAX000043	1982	{"email": "contact43@ngo43.org", "phone": "+886578976613", "address": "43 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo43.org	{"twitter": "https://twitter.com/ngo43", "facebook": "https://facebook.com/ngo43", "instagram": "https://instagram.com/ngo43"}	Sample NGO organization 43 description
44	NGO Organization 44	Healthcare	TAX000044	1962	{"email": "contact44@ngo44.org", "phone": "+886425932554", "address": "44 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo44.org	{"twitter": "https://twitter.com/ngo44", "facebook": "https://facebook.com/ngo44", "instagram": "https://instagram.com/ngo44"}	Sample NGO organization 44 description
45	NGO Organization 45	Educational	TAX000045	1971	{"email": "contact45@ngo45.org", "phone": "+886646175971", "address": "45 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo45.org	{"twitter": "https://twitter.com/ngo45", "facebook": "https://facebook.com/ngo45", "instagram": "https://instagram.com/ngo45"}	Sample NGO organization 45 description
46	NGO Organization 46	Social Services	TAX000046	1991	{"email": "contact46@ngo46.org", "phone": "+886865706882", "address": "46 NGO Street, Taipei, Taiwan"}	inactive	2025-03-10	https://www.ngo46.org	{"twitter": "https://twitter.com/ngo46", "facebook": "https://facebook.com/ngo46", "instagram": "https://instagram.com/ngo46"}	Sample NGO organization 46 description
47	NGO Organization 47	Human Rights	TAX000047	2013	{"email": "contact47@ngo47.org", "phone": "+886299381058", "address": "47 NGO Street, Taipei, Taiwan"}	inactive	2025-03-10	https://www.ngo47.org	{"twitter": "https://twitter.com/ngo47", "facebook": "https://facebook.com/ngo47", "instagram": "https://instagram.com/ngo47"}	Sample NGO organization 47 description
48	NGO Organization 48	Healthcare	TAX000048	1964	{"email": "contact48@ngo48.org", "phone": "+886679644718", "address": "48 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo48.org	{"twitter": "https://twitter.com/ngo48", "facebook": "https://facebook.com/ngo48", "instagram": "https://instagram.com/ngo48"}	Sample NGO organization 48 description
49	NGO Organization 49	Social Services	TAX000049	1999	{"email": "contact49@ngo49.org", "phone": "+88676487234", "address": "49 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo49.org	{"twitter": "https://twitter.com/ngo49", "facebook": "https://facebook.com/ngo49", "instagram": "https://instagram.com/ngo49"}	Sample NGO organization 49 description
50	NGO Organization 50	Educational	TAX000050	1991	{"email": "contact50@ngo50.org", "phone": "+886242214876", "address": "50 NGO Street, Taipei, Taiwan"}	inactive	2025-03-10	https://www.ngo50.org	{"twitter": "https://twitter.com/ngo50", "facebook": "https://facebook.com/ngo50", "instagram": "https://instagram.com/ngo50"}	Sample NGO organization 50 description
51	NGO Organization 51	Environmental	TAX000051	1998	{"email": "contact51@ngo51.org", "phone": "+886601798824", "address": "51 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo51.org	{"twitter": "https://twitter.com/ngo51", "facebook": "https://facebook.com/ngo51", "instagram": "https://instagram.com/ngo51"}	Sample NGO organization 51 description
52	NGO Organization 52	Environmental	TAX000052	1959	{"email": "contact52@ngo52.org", "phone": "+886606012075", "address": "52 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo52.org	{"twitter": "https://twitter.com/ngo52", "facebook": "https://facebook.com/ngo52", "instagram": "https://instagram.com/ngo52"}	Sample NGO organization 52 description
53	NGO Organization 53	Social Services	TAX000053	1950	{"email": "contact53@ngo53.org", "phone": "+886527730633", "address": "53 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo53.org	{"twitter": "https://twitter.com/ngo53", "facebook": "https://facebook.com/ngo53", "instagram": "https://instagram.com/ngo53"}	Sample NGO organization 53 description
54	NGO Organization 54	Environmental	TAX000054	1955	{"email": "contact54@ngo54.org", "phone": "+886264962441", "address": "54 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo54.org	{"twitter": "https://twitter.com/ngo54", "facebook": "https://facebook.com/ngo54", "instagram": "https://instagram.com/ngo54"}	Sample NGO organization 54 description
55	NGO Organization 55	Human Rights	TAX000055	1950	{"email": "contact55@ngo55.org", "phone": "+886197391336", "address": "55 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo55.org	{"twitter": "https://twitter.com/ngo55", "facebook": "https://facebook.com/ngo55", "instagram": "https://instagram.com/ngo55"}	Sample NGO organization 55 description
56	NGO Organization 56	Human Rights	TAX000056	2014	{"email": "contact56@ngo56.org", "phone": "+886813798757", "address": "56 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo56.org	{"twitter": "https://twitter.com/ngo56", "facebook": "https://facebook.com/ngo56", "instagram": "https://instagram.com/ngo56"}	Sample NGO organization 56 description
57	NGO Organization 57	Human Rights	TAX000057	2020	{"email": "contact57@ngo57.org", "phone": "+886865762581", "address": "57 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo57.org	{"twitter": "https://twitter.com/ngo57", "facebook": "https://facebook.com/ngo57", "instagram": "https://instagram.com/ngo57"}	Sample NGO organization 57 description
58	NGO Organization 58	Environmental	TAX000058	1955	{"email": "contact58@ngo58.org", "phone": "+886122638263", "address": "58 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo58.org	{"twitter": "https://twitter.com/ngo58", "facebook": "https://facebook.com/ngo58", "instagram": "https://instagram.com/ngo58"}	Sample NGO organization 58 description
59	NGO Organization 59	Environmental	TAX000059	2018	{"email": "contact59@ngo59.org", "phone": "+886354227657", "address": "59 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo59.org	{"twitter": "https://twitter.com/ngo59", "facebook": "https://facebook.com/ngo59", "instagram": "https://instagram.com/ngo59"}	Sample NGO organization 59 description
60	NGO Organization 60	Healthcare	TAX000060	1958	{"email": "contact60@ngo60.org", "phone": "+886189191179", "address": "60 NGO Street, Taipei, Taiwan"}	inactive	2025-03-10	https://www.ngo60.org	{"twitter": "https://twitter.com/ngo60", "facebook": "https://facebook.com/ngo60", "instagram": "https://instagram.com/ngo60"}	Sample NGO organization 60 description
61	NGO Organization 61	Social Services	TAX000061	1975	{"email": "contact61@ngo61.org", "phone": "+886500303270", "address": "61 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo61.org	{"twitter": "https://twitter.com/ngo61", "facebook": "https://facebook.com/ngo61", "instagram": "https://instagram.com/ngo61"}	Sample NGO organization 61 description
62	NGO Organization 62	Environmental	TAX000062	1965	{"email": "contact62@ngo62.org", "phone": "+886369200968", "address": "62 NGO Street, Taipei, Taiwan"}	inactive	2025-03-10	https://www.ngo62.org	{"twitter": "https://twitter.com/ngo62", "facebook": "https://facebook.com/ngo62", "instagram": "https://instagram.com/ngo62"}	Sample NGO organization 62 description
63	NGO Organization 63	Human Rights	TAX000063	1975	{"email": "contact63@ngo63.org", "phone": "+88680798024", "address": "63 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo63.org	{"twitter": "https://twitter.com/ngo63", "facebook": "https://facebook.com/ngo63", "instagram": "https://instagram.com/ngo63"}	Sample NGO organization 63 description
64	NGO Organization 64	Healthcare	TAX000064	2009	{"email": "contact64@ngo64.org", "phone": "+886489819861", "address": "64 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo64.org	{"twitter": "https://twitter.com/ngo64", "facebook": "https://facebook.com/ngo64", "instagram": "https://instagram.com/ngo64"}	Sample NGO organization 64 description
65	NGO Organization 65	Environmental	TAX000065	2017	{"email": "contact65@ngo65.org", "phone": "+886804441856", "address": "65 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo65.org	{"twitter": "https://twitter.com/ngo65", "facebook": "https://facebook.com/ngo65", "instagram": "https://instagram.com/ngo65"}	Sample NGO organization 65 description
66	NGO Organization 66	Educational	TAX000066	1983	{"email": "contact66@ngo66.org", "phone": "+886763499585", "address": "66 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo66.org	{"twitter": "https://twitter.com/ngo66", "facebook": "https://facebook.com/ngo66", "instagram": "https://instagram.com/ngo66"}	Sample NGO organization 66 description
67	NGO Organization 67	Educational	TAX000067	1964	{"email": "contact67@ngo67.org", "phone": "+886199615018", "address": "67 NGO Street, Taipei, Taiwan"}	inactive	2025-03-10	https://www.ngo67.org	{"twitter": "https://twitter.com/ngo67", "facebook": "https://facebook.com/ngo67", "instagram": "https://instagram.com/ngo67"}	Sample NGO organization 67 description
68	NGO Organization 68	Educational	TAX000068	2016	{"email": "contact68@ngo68.org", "phone": "+886993872531", "address": "68 NGO Street, Taipei, Taiwan"}	inactive	2025-03-10	https://www.ngo68.org	{"twitter": "https://twitter.com/ngo68", "facebook": "https://facebook.com/ngo68", "instagram": "https://instagram.com/ngo68"}	Sample NGO organization 68 description
69	NGO Organization 69	Healthcare	TAX000069	1978	{"email": "contact69@ngo69.org", "phone": "+886789900322", "address": "69 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo69.org	{"twitter": "https://twitter.com/ngo69", "facebook": "https://facebook.com/ngo69", "instagram": "https://instagram.com/ngo69"}	Sample NGO organization 69 description
70	NGO Organization 70	Healthcare	TAX000070	1969	{"email": "contact70@ngo70.org", "phone": "+886174835667", "address": "70 NGO Street, Taipei, Taiwan"}	inactive	2025-03-10	https://www.ngo70.org	{"twitter": "https://twitter.com/ngo70", "facebook": "https://facebook.com/ngo70", "instagram": "https://instagram.com/ngo70"}	Sample NGO organization 70 description
71	NGO Organization 71	Healthcare	TAX000071	2006	{"email": "contact71@ngo71.org", "phone": "+886725396165", "address": "71 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo71.org	{"twitter": "https://twitter.com/ngo71", "facebook": "https://facebook.com/ngo71", "instagram": "https://instagram.com/ngo71"}	Sample NGO organization 71 description
72	NGO Organization 72	Healthcare	TAX000072	1995	{"email": "contact72@ngo72.org", "phone": "+886358105094", "address": "72 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo72.org	{"twitter": "https://twitter.com/ngo72", "facebook": "https://facebook.com/ngo72", "instagram": "https://instagram.com/ngo72"}	Sample NGO organization 72 description
73	NGO Organization 73	Healthcare	TAX000073	1995	{"email": "contact73@ngo73.org", "phone": "+886368356621", "address": "73 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo73.org	{"twitter": "https://twitter.com/ngo73", "facebook": "https://facebook.com/ngo73", "instagram": "https://instagram.com/ngo73"}	Sample NGO organization 73 description
74	NGO Organization 74	Social Services	TAX000074	1956	{"email": "contact74@ngo74.org", "phone": "+886786833289", "address": "74 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo74.org	{"twitter": "https://twitter.com/ngo74", "facebook": "https://facebook.com/ngo74", "instagram": "https://instagram.com/ngo74"}	Sample NGO organization 74 description
75	NGO Organization 75	Human Rights	TAX000075	2020	{"email": "contact75@ngo75.org", "phone": "+886546995622", "address": "75 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo75.org	{"twitter": "https://twitter.com/ngo75", "facebook": "https://facebook.com/ngo75", "instagram": "https://instagram.com/ngo75"}	Sample NGO organization 75 description
76	NGO Organization 76	Healthcare	TAX000076	1969	{"email": "contact76@ngo76.org", "phone": "+886632302929", "address": "76 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo76.org	{"twitter": "https://twitter.com/ngo76", "facebook": "https://facebook.com/ngo76", "instagram": "https://instagram.com/ngo76"}	Sample NGO organization 76 description
77	NGO Organization 77	Social Services	TAX000077	1984	{"email": "contact77@ngo77.org", "phone": "+886197416141", "address": "77 NGO Street, Taipei, Taiwan"}	inactive	2025-03-10	https://www.ngo77.org	{"twitter": "https://twitter.com/ngo77", "facebook": "https://facebook.com/ngo77", "instagram": "https://instagram.com/ngo77"}	Sample NGO organization 77 description
78	NGO Organization 78	Human Rights	TAX000078	1977	{"email": "contact78@ngo78.org", "phone": "+886833647763", "address": "78 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo78.org	{"twitter": "https://twitter.com/ngo78", "facebook": "https://facebook.com/ngo78", "instagram": "https://instagram.com/ngo78"}	Sample NGO organization 78 description
79	NGO Organization 79	Healthcare	TAX000079	1959	{"email": "contact79@ngo79.org", "phone": "+886351678130", "address": "79 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo79.org	{"twitter": "https://twitter.com/ngo79", "facebook": "https://facebook.com/ngo79", "instagram": "https://instagram.com/ngo79"}	Sample NGO organization 79 description
80	NGO Organization 80	Human Rights	TAX000080	1979	{"email": "contact80@ngo80.org", "phone": "+886612524078", "address": "80 NGO Street, Taipei, Taiwan"}	inactive	2025-03-10	https://www.ngo80.org	{"twitter": "https://twitter.com/ngo80", "facebook": "https://facebook.com/ngo80", "instagram": "https://instagram.com/ngo80"}	Sample NGO organization 80 description
81	NGO Organization 81	Environmental	TAX000081	1984	{"email": "contact81@ngo81.org", "phone": "+886567667563", "address": "81 NGO Street, Taipei, Taiwan"}	inactive	2025-03-10	https://www.ngo81.org	{"twitter": "https://twitter.com/ngo81", "facebook": "https://facebook.com/ngo81", "instagram": "https://instagram.com/ngo81"}	Sample NGO organization 81 description
82	NGO Organization 82	Educational	TAX000082	1969	{"email": "contact82@ngo82.org", "phone": "+886912906349", "address": "82 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo82.org	{"twitter": "https://twitter.com/ngo82", "facebook": "https://facebook.com/ngo82", "instagram": "https://instagram.com/ngo82"}	Sample NGO organization 82 description
83	NGO Organization 83	Human Rights	TAX000083	2013	{"email": "contact83@ngo83.org", "phone": "+886578681649", "address": "83 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo83.org	{"twitter": "https://twitter.com/ngo83", "facebook": "https://facebook.com/ngo83", "instagram": "https://instagram.com/ngo83"}	Sample NGO organization 83 description
84	NGO Organization 84	Social Services	TAX000084	1984	{"email": "contact84@ngo84.org", "phone": "+886563645743", "address": "84 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo84.org	{"twitter": "https://twitter.com/ngo84", "facebook": "https://facebook.com/ngo84", "instagram": "https://instagram.com/ngo84"}	Sample NGO organization 84 description
85	NGO Organization 85	Human Rights	TAX000085	2002	{"email": "contact85@ngo85.org", "phone": "+886504727781", "address": "85 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo85.org	{"twitter": "https://twitter.com/ngo85", "facebook": "https://facebook.com/ngo85", "instagram": "https://instagram.com/ngo85"}	Sample NGO organization 85 description
86	NGO Organization 86	Educational	TAX000086	1999	{"email": "contact86@ngo86.org", "phone": "+886818251892", "address": "86 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo86.org	{"twitter": "https://twitter.com/ngo86", "facebook": "https://facebook.com/ngo86", "instagram": "https://instagram.com/ngo86"}	Sample NGO organization 86 description
87	NGO Organization 87	Human Rights	TAX000087	1987	{"email": "contact87@ngo87.org", "phone": "+886665895533", "address": "87 NGO Street, Taipei, Taiwan"}	inactive	2025-03-10	https://www.ngo87.org	{"twitter": "https://twitter.com/ngo87", "facebook": "https://facebook.com/ngo87", "instagram": "https://instagram.com/ngo87"}	Sample NGO organization 87 description
88	NGO Organization 88	Educational	TAX000088	2002	{"email": "contact88@ngo88.org", "phone": "+886723112009", "address": "88 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo88.org	{"twitter": "https://twitter.com/ngo88", "facebook": "https://facebook.com/ngo88", "instagram": "https://instagram.com/ngo88"}	Sample NGO organization 88 description
89	NGO Organization 89	Social Services	TAX000089	1976	{"email": "contact89@ngo89.org", "phone": "+886350671041", "address": "89 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo89.org	{"twitter": "https://twitter.com/ngo89", "facebook": "https://facebook.com/ngo89", "instagram": "https://instagram.com/ngo89"}	Sample NGO organization 89 description
90	NGO Organization 90	Social Services	TAX000090	1962	{"email": "contact90@ngo90.org", "phone": "+8861611800", "address": "90 NGO Street, Taipei, Taiwan"}	inactive	2025-03-10	https://www.ngo90.org	{"twitter": "https://twitter.com/ngo90", "facebook": "https://facebook.com/ngo90", "instagram": "https://instagram.com/ngo90"}	Sample NGO organization 90 description
91	NGO Organization 91	Environmental	TAX000091	2006	{"email": "contact91@ngo91.org", "phone": "+886500922812", "address": "91 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo91.org	{"twitter": "https://twitter.com/ngo91", "facebook": "https://facebook.com/ngo91", "instagram": "https://instagram.com/ngo91"}	Sample NGO organization 91 description
92	NGO Organization 92	Human Rights	TAX000092	2000	{"email": "contact92@ngo92.org", "phone": "+88612862373", "address": "92 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo92.org	{"twitter": "https://twitter.com/ngo92", "facebook": "https://facebook.com/ngo92", "instagram": "https://instagram.com/ngo92"}	Sample NGO organization 92 description
93	NGO Organization 93	Environmental	TAX000093	1973	{"email": "contact93@ngo93.org", "phone": "+886872788877", "address": "93 NGO Street, Taipei, Taiwan"}	inactive	2025-03-10	https://www.ngo93.org	{"twitter": "https://twitter.com/ngo93", "facebook": "https://facebook.com/ngo93", "instagram": "https://instagram.com/ngo93"}	Sample NGO organization 93 description
94	NGO Organization 94	Educational	TAX000094	1984	{"email": "contact94@ngo94.org", "phone": "+886703003636", "address": "94 NGO Street, Taipei, Taiwan"}	inactive	2025-03-10	https://www.ngo94.org	{"twitter": "https://twitter.com/ngo94", "facebook": "https://facebook.com/ngo94", "instagram": "https://instagram.com/ngo94"}	Sample NGO organization 94 description
95	NGO Organization 95	Educational	TAX000095	1975	{"email": "contact95@ngo95.org", "phone": "+886589300014", "address": "95 NGO Street, Taipei, Taiwan"}	active	2025-03-10	https://www.ngo95.org	{"twitter": "https://twitter.com/ngo95", "facebook": "https://facebook.com/ngo95", "instagram": "https://instagram.com/ngo95"}	Sample NGO organization 95 description
96	NGO Organization 96	Social Services	TAX000096	2013	{"email": "contact96@ngo96.org", "phone": "+886166968850", "address": "96 NGO Street, Taipei, Taiwan"}	inactive	2025-03-10	https://www.ngo96.org	{"twitter": "https://twitter.com/ngo96", "facebook": "https://facebook.com/ngo96", "instagram": "https://instagram.com/ngo96"}	Sample NGO organization 96 description
97	NGO Organization 97	Environmental	TAX000097	1952	{"email": "contact97@ngo97.org", "phone": "+88692913560", "address": "97 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo97.org	{"twitter": "https://twitter.com/ngo97", "facebook": "https://facebook.com/ngo97", "instagram": "https://instagram.com/ngo97"}	Sample NGO organization 97 description
98	NGO Organization 98	Human Rights	TAX000098	1974	{"email": "contact98@ngo98.org", "phone": "+88610216926", "address": "98 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo98.org	{"twitter": "https://twitter.com/ngo98", "facebook": "https://facebook.com/ngo98", "instagram": "https://instagram.com/ngo98"}	Sample NGO organization 98 description
99	NGO Organization 99	Social Services	TAX000099	1988	{"email": "contact99@ngo99.org", "phone": "+886208648968", "address": "99 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo99.org	{"twitter": "https://twitter.com/ngo99", "facebook": "https://facebook.com/ngo99", "instagram": "https://instagram.com/ngo99"}	Sample NGO organization 99 description
100	NGO Organization 100	Healthcare	TAX000100	1999	{"email": "contact100@ngo100.org", "phone": "+886597254241", "address": "100 NGO Street, Taipei, Taiwan"}	pending	2025-03-10	https://www.ngo100.org	{"twitter": "https://twitter.com/ngo100", "facebook": "https://facebook.com/ngo100", "instagram": "https://instagram.com/ngo100"}	Sample NGO organization 100 description
\.


--
-- Name: organizations_organization_id_seq; Type: SEQUENCE SET; Schema: donation; Owner: Your_name
--

SELECT pg_catalog.setval('donation.organizations_organization_id_seq', 100, true);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: donation; Owner: Your_name
--

ALTER TABLE ONLY donation._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: organizations organizations_pkey; Type: CONSTRAINT; Schema: donation; Owner: Your_name
--

ALTER TABLE ONLY donation.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--