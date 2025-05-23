PGDMP     $        
            }            quizzs     12.22 (Debian 12.22-1.pgdg120+1)    15.12 (Debian 15.12-0+deb12u2) 8               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    19143    quizzs    DATABASE     q   CREATE DATABASE quizzs WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE quizzs;
                postgres    false                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false                       0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    8                        3079    29757 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false    8                        0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �           1247    29769    questions_question_type_enum    TYPE     w   CREATE TYPE public.questions_question_type_enum AS ENUM (
    'multiple_choice',
    'drag_drop',
    'audio_guess'
);
 /   DROP TYPE public.questions_question_type_enum;
       public          postgres    false    8            �           1247    29776    users_role_enum    TYPE     Z   CREATE TYPE public.users_role_enum AS ENUM (
    'student',
    'teacher',
    'admin'
);
 "   DROP TYPE public.users_role_enum;
       public          postgres    false    8            �            1259    29783    answers    TABLE     E  CREATE TABLE public.answers (
    answer_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    answer_text text,
    is_correct boolean,
    reason text,
    submitted_at timestamp without time zone DEFAULT now() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    "questionQuestionId" uuid
);
    DROP TABLE public.answers;
       public         heap    postgres    false    2    8    8            �            1259    29792    audio_guesses    TABLE     �   CREATE TABLE public.audio_guesses (
    audio_guess_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    correct_guess character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    "questionQuestionId" uuid
);
 !   DROP TABLE public.audio_guesses;
       public         heap    postgres    false    2    8    8            �            1259    29797    classes    TABLE     �   CREATE TABLE public.classes (
    class_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    class_name character varying(100) NOT NULL
);
    DROP TABLE public.classes;
       public         heap    postgres    false    2    8    8            �            1259    29801    drag_drop_answers    TABLE     �   CREATE TABLE public.drag_drop_answers (
    "dragDropAnswer_id" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    correct_order json NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    "questionQuestionId" uuid
);
 %   DROP TABLE public.drag_drop_answers;
       public         heap    postgres    false    2    8    8            �            1259    29809 	   questions    TABLE     F  CREATE TABLE public.questions (
    question_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    question_text text NOT NULL,
    question_type public.questions_question_type_enum NOT NULL,
    media_url character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    "quizzQuizzId" uuid
);
    DROP TABLE public.questions;
       public         heap    postgres    false    2    8    641    8            �            1259    29817    quizzes    TABLE     z  CREATE TABLE public.quizzes (
    quizz_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    article text,
    "time" integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    "userUserId" uuid,
    "subjectSubjectId" uuid,
    "resultsResultId" uuid,
    "classClassId" uuid
);
    DROP TABLE public.quizzes;
       public         heap    postgres    false    2    8    8            �            1259    29825    quizzes_classes_classes    TABLE     x   CREATE TABLE public.quizzes_classes_classes (
    "quizzesQuizzId" uuid NOT NULL,
    "classesClassId" uuid NOT NULL
);
 +   DROP TABLE public.quizzes_classes_classes;
       public         heap    postgres    false    8            �            1259    29828    results    TABLE     )  CREATE TABLE public.results (
    result_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    score numeric(5,2) NOT NULL,
    completed_at timestamp without time zone DEFAULT now() NOT NULL,
    answer_ids json,
    "userUserId" uuid,
    "subjectSubjectId" uuid,
    "quizzesQuizzId" uuid
);
    DROP TABLE public.results;
       public         heap    postgres    false    2    8    8            �            1259    29836    subjects    TABLE     �   CREATE TABLE public.subjects (
    subject_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    subject_name character varying(100) NOT NULL
);
    DROP TABLE public.subjects;
       public         heap    postgres    false    2    8    8            �            1259    29840    users    TABLE     �  CREATE TABLE public.users (
    user_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying NOT NULL,
    role public.users_role_enum NOT NULL,
    "isActive" boolean DEFAULT false NOT NULL,
    refresh_token character varying,
    code_otp character varying,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    "classClassId" uuid
);
    DROP TABLE public.users;
       public         heap    postgres    false    2    8    8    644                      0    29783    answers 
   TABLE DATA           }   COPY public.answers (answer_id, answer_text, is_correct, reason, submitted_at, created_at, "questionQuestionId") FROM stdin;
    public          postgres    false    203   �N                 0    29792    audio_guesses 
   TABLE DATA           h   COPY public.audio_guesses (audio_guess_id, correct_guess, created_at, "questionQuestionId") FROM stdin;
    public          postgres    false    204   �c                 0    29797    classes 
   TABLE DATA           7   COPY public.classes (class_id, class_name) FROM stdin;
    public          postgres    false    205   d                 0    29801    drag_drop_answers 
   TABLE DATA           q   COPY public.drag_drop_answers ("dragDropAnswer_id", correct_order, created_at, "questionQuestionId") FROM stdin;
    public          postgres    false    206   �e                 0    29809 	   questions 
   TABLE DATA           u   COPY public.questions (question_id, question_text, question_type, media_url, created_at, "quizzQuizzId") FROM stdin;
    public          postgres    false    207   �e                 0    29817    quizzes 
   TABLE DATA           �   COPY public.quizzes (quizz_id, title, description, article, "time", created_at, "userUserId", "subjectSubjectId", "resultsResultId", "classClassId") FROM stdin;
    public          postgres    false    208   l                 0    29825    quizzes_classes_classes 
   TABLE DATA           U   COPY public.quizzes_classes_classes ("quizzesQuizzId", "classesClassId") FROM stdin;
    public          postgres    false    209   �t                 0    29828    results 
   TABLE DATA           �   COPY public.results (result_id, score, completed_at, answer_ids, "userUserId", "subjectSubjectId", "quizzesQuizzId") FROM stdin;
    public          postgres    false    210   �u                 0    29836    subjects 
   TABLE DATA           <   COPY public.subjects (subject_id, subject_name) FROM stdin;
    public          postgres    false    211   �z                 0    29840    users 
   TABLE DATA           �   COPY public.users (user_id, username, email, password, role, "isActive", refresh_token, code_otp, created_at, "classClassId") FROM stdin;
    public          postgres    false    212   �{       r           2606    29850 &   classes PK_1c29abc497051d41c2d6e276a05 
   CONSTRAINT     l   ALTER TABLE ONLY public.classes
    ADD CONSTRAINT "PK_1c29abc497051d41c2d6e276a05" PRIMARY KEY (class_id);
 R   ALTER TABLE ONLY public.classes DROP CONSTRAINT "PK_1c29abc497051d41c2d6e276a05";
       public            postgres    false    205            �           2606    29852 '   subjects PK_3573ed298f466a8ba663579e077 
   CONSTRAINT     o   ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT "PK_3573ed298f466a8ba663579e077" PRIMARY KEY (subject_id);
 S   ALTER TABLE ONLY public.subjects DROP CONSTRAINT "PK_3573ed298f466a8ba663579e077";
       public            postgres    false    211            ~           2606    29854 &   results PK_3c8f50c2bb1131ae2acc86bb48e 
   CONSTRAINT     m   ALTER TABLE ONLY public.results
    ADD CONSTRAINT "PK_3c8f50c2bb1131ae2acc86bb48e" PRIMARY KEY (result_id);
 R   ALTER TABLE ONLY public.results DROP CONSTRAINT "PK_3c8f50c2bb1131ae2acc86bb48e";
       public            postgres    false    210            t           2606    29856 0   drag_drop_answers PK_6dd6fbefb8f3c518a396caba519 
   CONSTRAINT     �   ALTER TABLE ONLY public.drag_drop_answers
    ADD CONSTRAINT "PK_6dd6fbefb8f3c518a396caba519" PRIMARY KEY ("dragDropAnswer_id");
 \   ALTER TABLE ONLY public.drag_drop_answers DROP CONSTRAINT "PK_6dd6fbefb8f3c518a396caba519";
       public            postgres    false    206            |           2606    29858 6   quizzes_classes_classes PK_7638b43469f8a13564d97e255f6 
   CONSTRAINT     �   ALTER TABLE ONLY public.quizzes_classes_classes
    ADD CONSTRAINT "PK_7638b43469f8a13564d97e255f6" PRIMARY KEY ("quizzesQuizzId", "classesClassId");
 b   ALTER TABLE ONLY public.quizzes_classes_classes DROP CONSTRAINT "PK_7638b43469f8a13564d97e255f6";
       public            postgres    false    209    209            v           2606    29860 (   questions PK_8e940ecc478000e09fa8b008ec6 
   CONSTRAINT     q   ALTER TABLE ONLY public.questions
    ADD CONSTRAINT "PK_8e940ecc478000e09fa8b008ec6" PRIMARY KEY (question_id);
 T   ALTER TABLE ONLY public.questions DROP CONSTRAINT "PK_8e940ecc478000e09fa8b008ec6";
       public            postgres    false    207            �           2606    29862 $   users PK_96aac72f1574b88752e9fb00089 
   CONSTRAINT     i   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY (user_id);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "PK_96aac72f1574b88752e9fb00089";
       public            postgres    false    212            x           2606    29864 &   quizzes PK_b7d4aa6b41f9d06330dcf7695e3 
   CONSTRAINT     l   ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT "PK_b7d4aa6b41f9d06330dcf7695e3" PRIMARY KEY (quizz_id);
 R   ALTER TABLE ONLY public.quizzes DROP CONSTRAINT "PK_b7d4aa6b41f9d06330dcf7695e3";
       public            postgres    false    208            n           2606    29866 &   answers PK_cb080abe9c2f19dc80f9563bf50 
   CONSTRAINT     m   ALTER TABLE ONLY public.answers
    ADD CONSTRAINT "PK_cb080abe9c2f19dc80f9563bf50" PRIMARY KEY (answer_id);
 R   ALTER TABLE ONLY public.answers DROP CONSTRAINT "PK_cb080abe9c2f19dc80f9563bf50";
       public            postgres    false    203            p           2606    29868 ,   audio_guesses PK_fc2c8e780e4a2be2d3fb86a3800 
   CONSTRAINT     x   ALTER TABLE ONLY public.audio_guesses
    ADD CONSTRAINT "PK_fc2c8e780e4a2be2d3fb86a3800" PRIMARY KEY (audio_guess_id);
 X   ALTER TABLE ONLY public.audio_guesses DROP CONSTRAINT "PK_fc2c8e780e4a2be2d3fb86a3800";
       public            postgres    false    204            y           1259    29869    IDX_abb25903a56d4134889d06ea01    INDEX     p   CREATE INDEX "IDX_abb25903a56d4134889d06ea01" ON public.quizzes_classes_classes USING btree ("quizzesQuizzId");
 4   DROP INDEX public."IDX_abb25903a56d4134889d06ea01";
       public            postgres    false    209            z           1259    29870    IDX_be7d41d2022b3e9af2e2813058    INDEX     p   CREATE INDEX "IDX_be7d41d2022b3e9af2e2813058" ON public.quizzes_classes_classes USING btree ("classesClassId");
 4   DROP INDEX public."IDX_be7d41d2022b3e9af2e2813058";
       public            postgres    false    209            �           2606    29871 &   answers FK_1a8f790e4bd5cad9c0c80a17141    FK CONSTRAINT     �   ALTER TABLE ONLY public.answers
    ADD CONSTRAINT "FK_1a8f790e4bd5cad9c0c80a17141" FOREIGN KEY ("questionQuestionId") REFERENCES public.questions(question_id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.answers DROP CONSTRAINT "FK_1a8f790e4bd5cad9c0c80a17141";
       public          postgres    false    203    2934    207            �           2606    29876 &   results FK_1f731e01e0e2fd0a18beeb71115    FK CONSTRAINT     �   ALTER TABLE ONLY public.results
    ADD CONSTRAINT "FK_1f731e01e0e2fd0a18beeb71115" FOREIGN KEY ("quizzesQuizzId") REFERENCES public.quizzes(quizz_id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.results DROP CONSTRAINT "FK_1f731e01e0e2fd0a18beeb71115";
       public          postgres    false    2936    210    208            �           2606    29881 ,   audio_guesses FK_20ea6e0eaf46179e3f6d057ebca    FK CONSTRAINT     �   ALTER TABLE ONLY public.audio_guesses
    ADD CONSTRAINT "FK_20ea6e0eaf46179e3f6d057ebca" FOREIGN KEY ("questionQuestionId") REFERENCES public.questions(question_id) ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.audio_guesses DROP CONSTRAINT "FK_20ea6e0eaf46179e3f6d057ebca";
       public          postgres    false    204    207    2934            �           2606    29886 &   quizzes FK_238d287ac529e65d6486fdf199d    FK CONSTRAINT     �   ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT "FK_238d287ac529e65d6486fdf199d" FOREIGN KEY ("classClassId") REFERENCES public.classes(class_id);
 R   ALTER TABLE ONLY public.quizzes DROP CONSTRAINT "FK_238d287ac529e65d6486fdf199d";
       public          postgres    false    2930    208    205            �           2606    29891 0   drag_drop_answers FK_26c8ddf89c0e03b627b9d96d738    FK CONSTRAINT     �   ALTER TABLE ONLY public.drag_drop_answers
    ADD CONSTRAINT "FK_26c8ddf89c0e03b627b9d96d738" FOREIGN KEY ("questionQuestionId") REFERENCES public.questions(question_id) ON DELETE CASCADE;
 \   ALTER TABLE ONLY public.drag_drop_answers DROP CONSTRAINT "FK_26c8ddf89c0e03b627b9d96d738";
       public          postgres    false    207    206    2934            �           2606    29896 &   quizzes FK_3604c816e13d771e7fa8df6e5ca    FK CONSTRAINT     �   ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT "FK_3604c816e13d771e7fa8df6e5ca" FOREIGN KEY ("userUserId") REFERENCES public.users(user_id);
 R   ALTER TABLE ONLY public.quizzes DROP CONSTRAINT "FK_3604c816e13d771e7fa8df6e5ca";
       public          postgres    false    2946    212    208            �           2606    29901 (   questions FK_8e693293995f0f807f22f86bd1c    FK CONSTRAINT     �   ALTER TABLE ONLY public.questions
    ADD CONSTRAINT "FK_8e693293995f0f807f22f86bd1c" FOREIGN KEY ("quizzQuizzId") REFERENCES public.quizzes(quizz_id) ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.questions DROP CONSTRAINT "FK_8e693293995f0f807f22f86bd1c";
       public          postgres    false    2936    207    208            �           2606    29906 &   quizzes FK_9c542c3cd9489b9b0d3192f7b38    FK CONSTRAINT     �   ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT "FK_9c542c3cd9489b9b0d3192f7b38" FOREIGN KEY ("resultsResultId") REFERENCES public.results(result_id);
 R   ALTER TABLE ONLY public.quizzes DROP CONSTRAINT "FK_9c542c3cd9489b9b0d3192f7b38";
       public          postgres    false    2942    208    210            �           2606    29911 $   users FK_aba130f16dcc9c7a5ba13712f36    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_aba130f16dcc9c7a5ba13712f36" FOREIGN KEY ("classClassId") REFERENCES public.classes(class_id);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "FK_aba130f16dcc9c7a5ba13712f36";
       public          postgres    false    212    205    2930            �           2606    29916 6   quizzes_classes_classes FK_abb25903a56d4134889d06ea01d    FK CONSTRAINT     �   ALTER TABLE ONLY public.quizzes_classes_classes
    ADD CONSTRAINT "FK_abb25903a56d4134889d06ea01d" FOREIGN KEY ("quizzesQuizzId") REFERENCES public.quizzes(quizz_id) ON UPDATE CASCADE ON DELETE CASCADE;
 b   ALTER TABLE ONLY public.quizzes_classes_classes DROP CONSTRAINT "FK_abb25903a56d4134889d06ea01d";
       public          postgres    false    209    2936    208            �           2606    29921 6   quizzes_classes_classes FK_be7d41d2022b3e9af2e2813058c    FK CONSTRAINT     �   ALTER TABLE ONLY public.quizzes_classes_classes
    ADD CONSTRAINT "FK_be7d41d2022b3e9af2e2813058c" FOREIGN KEY ("classesClassId") REFERENCES public.classes(class_id);
 b   ALTER TABLE ONLY public.quizzes_classes_classes DROP CONSTRAINT "FK_be7d41d2022b3e9af2e2813058c";
       public          postgres    false    209    205    2930            �           2606    29926 &   results FK_ca60ad9b3b31538111a39edb6df    FK CONSTRAINT     �   ALTER TABLE ONLY public.results
    ADD CONSTRAINT "FK_ca60ad9b3b31538111a39edb6df" FOREIGN KEY ("userUserId") REFERENCES public.users(user_id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.results DROP CONSTRAINT "FK_ca60ad9b3b31538111a39edb6df";
       public          postgres    false    2946    212    210            �           2606    29931 &   results FK_d2c15601f86021607bc3d0bebad    FK CONSTRAINT     �   ALTER TABLE ONLY public.results
    ADD CONSTRAINT "FK_d2c15601f86021607bc3d0bebad" FOREIGN KEY ("subjectSubjectId") REFERENCES public.subjects(subject_id);
 R   ALTER TABLE ONLY public.results DROP CONSTRAINT "FK_d2c15601f86021607bc3d0bebad";
       public          postgres    false    211    210    2944            �           2606    29936 &   quizzes FK_fbd22f76b3b55959b0d074de9d4    FK CONSTRAINT     �   ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT "FK_fbd22f76b3b55959b0d074de9d4" FOREIGN KEY ("subjectSubjectId") REFERENCES public.subjects(subject_id);
 R   ALTER TABLE ONLY public.quizzes DROP CONSTRAINT "FK_fbd22f76b3b55959b0d074de9d4";
       public          postgres    false    211    208    2944                  x��[Mo\Ǖ]���-m�ը�WE`��1�a��z���4��6g%A�Z�E�	"Y�J,8��̢��'�_2��k�M�)-Lڀ)��^�[��{ﹷ�c�9�.���a��B�%��JU�iy'��h�||0��6���ɤIg��&���p�g�x�h�ݤ餙�~����_���!&��8:;��y3���=ų�?��p�d�L�aѼ����Q3;;�r�{����G�$��qɄk��bG����{�!+c�Z�Y�20-K�^�fFjSZ�rIn+�$-���T:�C,�X�҄N����nB�L�(���v`����D��r+b�r���4��Z֕A��>�-.�3)��-L�:��B˔�d�rI�{�{�~�|��,�N�}:�t򏣪��p�"whN3�"G�l��f��y��dpIX��Ŏ4�Z/�����b�CǂR��Q��h��Ζ���%{ J��e�l��.w��ֹ �?hf��*�eQJj��%� ,'��ܙ��In:�z)�}0h�w.�h�Ǉ��-�]�,�ְ�U������އ���!d��G^,�ɱ�`��ĸ� ������Y�#�K�Z�!�D�Na���-yb<ĠK�����-�n|P�t3�ǤX$�R
��Cq��2�.���M�/�ҍ����;���	i�䷡I˧�fw��]nGh�	�:��T�,HC�P�U�M�\��k!e�0�䉅��=�a	�=��榈(w-�̝6N�S���B��*j��#F�F��0���W6��v�xquM���u֥�,yL�+�p�"�:Mт�\�tjm�W�Fm���r�J�r򉀷���<�&?�Pʸ�YBk(�Xev�y�Ά�tY|�7�%��:�6�,m0���`w2� c�@��%�U�ug�p���O�!����՗S�O��Y���nuK"���7r.��N*�F�D���2?��p������·̛���� \1]ʌ����UJ��ZluE��:��P���,p��ü����4a��ަ0��̅� Q:�a��Zj/LL�χ��f�ݦ4�3��c ���R�xY���a!��  w��� O<�Cv�d�s0���@)J��\��t���J��	aƪ7�^�Hit�`/%&��|1Rm��0���b]�c#�gL�����A�b8��MwGev�B���0$����V �<ed��B���tw:�-�?��L���a�pp����^;0�R� !��o~��	�c�@r�7�l@��l�K#�t�y�uF="��B�LAB�҈R�MN�BU�0fҡ�|�P%�7��6��mQ�u�e��Cg��1[��@��ͼ�vUS�d��L��B�fmy``�s/�&��a�+�f�`zX��CUۋ@��	jӿ?��a������_o�J�Q���|��4~�h��Oh���4�'���|4�`�\�5�����(�����R��}���&aiH0;;�_�P���
/<8;��剫�@N�|�
��N���$���&&�5��]@�#Gأ�L���a�l4��Qn` ~M��!_��?R1�R)=�rn���QQ��=�����P^v�2w��(��ˆ<"M��{ ?w.PT�h��(�A{P�8*�+&b��&���b{\�^�����P�Q1>;�)� X<p��Ch���׋Z�??��A��e��m���W���ۦ�X�1}�:-@��B���p}rԣ�v�/�Bdx��&N��+�	�sH��+\��U�v��!�"㉊+� KB�
""���Ѱ�~pt�A� PF�z��rJ��l�f%2�/9F[]���iav�x�r~-ŭ	�!OITs�M[x.J{�P�/t��[*�o̔y���cfEGg�F*�|h8�5�2��`�ٱoS(���EJH��EM ��Rr �I~�2k4_�͎}�u��֘����Q��<�2c�/R�!Ї�c�G9j>��G�9x[��y#�b�M���:�}j�N��>O�ވ<�E�ك����qG��wM_{��8T?�������7����yz�g� 9�v��ܴ��'���ycpty�5W�M���bHO�d�1ga�l��{2�vG�sB���KC�&ki8�����&<W��])�������u�Z����@�]Z�}����r�/�v�f�s��H��E �*A5���V8f��U�!�"j���ަ,�:|(Q贡P?|£4m��	���iw��2��w�jq2�C ��J��i��9jN�+6#p��F������ �+�͐E�6p_�[iJ���J��5wͣ�6{��b�G�9x��%>r���!ώ��S��;v��ƟM{&y�Jq�E
���"����)�t��>�.v�7d�۔��Y����P�$� �d�m�B��*���2+��M+�#p��ꈫ�k ��:�2H�
E��=��\_k=����P�@5��_�o�K�7 �[NC���*!B&�b��P*�qnK���0��w)�ך��/t�κh��#��C� �r=��5��T���m�$�+�S�)K���ϴ�%J*�=����w����z����������r~�.#W�K��˓�Λ1&Q�*�,�\���N��dw��yX�y5@`ڸ�jp.�<h>Y� �?���-H��=5����	~�������dxW��<H_a�w�:A�&����G�@b�-��|cGTx�r�����^��.�{�$�Q*�%��XR٤�:��[]�TA���b5�
%�mÄH1�VG�M�P�,f���\x�2I8���7&zKG�p�,�vƹ���؃�rp4���Pk=����D4�5��i�D��'�;i8���s�=?��Zӥ�F���A�y9,�Y��նŻ��i,�`��M�Fd%3�7���Z"�7A���N�N(�͡�6%2(�x�P��_�X�pt\�LI���X�$��0��'�o๭�o�jB��HMn��'03-���%▅P��-Q1�Yp�0Q���;�Zr������CS*�y�y�U������T�פ�����@�������y�.� �|��f��.	$t١▊gS�z�L�7��[��D�cԙ�D'vh48��Y��������B�]��*TPJg�2�A��I�N��w�����r/4| �Zy����� ����
,X@Rp8/\ې��-FIT�oCu &�O�n�d�=�����l\�����s�� Y�.��OK������tZ�;���G��Qm�����I��iM�4��KΣ�2��Rp.��'�7���D�!ڬQ[���L�����{&��[��q)�sq��)W���/���,7���n�x�M-�<ԣ�P�Ӂ?q�<E��C���?\�u�Źt{.��>��'����.�h^�y����ѝ_�����R�: v�EF�s	��`;��G��$��i'9~:����;^d�]*�`���V�]Y��55��|�|��$x�Ϟ~��6�|�I�ܱؖ68D���!��Q���&��KG)4����co���^��Ե����?Q1\~5!E�X�{ºB>��u�!g��w]�U������Eh���T��N��^�p���9���!W������b�1d�Ț,�����Ӈ����p��/�IqN����B���g�� ��a����? ���>K��߇�+"�BF���5B�I%4c�B�i�h�� Բ8}|���������2�>��B���C�9���!I���C/O��aq޾�CW��b1�����f�=�\��I��A�>N��U4����m���b����FJ7��jD`ql�Z�^U�I�'��ڨ*�X��L����G�W�t؋�
�j�sk��.��a\���P�Ȑ�RC}⽬����U~�l��~�X��'�MFHs����L�-��-��S�ē���z۾��u���%�$��A,�Kj���U�7G�� ���@	zd����1�M)DV��q$_���[ZY��$AZ:�b]�ͣ��s��p�aoc���� 8���
�S��ӝ� :�y T  @hmQl����N�)o��YP,{v-^���e8���g�9|8֐	�C�r~�ZOR&�Ӛ�����V�o�� `zI�~>[]Z�X��7�ǯ%��|S�KȩG3X}�d�
�}�i�����tm��z�1^3y�h܌�hqv�������C
���?Vk��/���mB�ɻ}�Ɠ��pzZ�B��5ag���}�����W�m�v{T��B
EmG���� 
��n�S�aw�<��YE��/�M��^чt����g�PQV0�[���+.P���zA�����z ��������Gd���	�4���:3G��+5K���d�N�BA�Ĥz~V����ܧ-���C�0�4�Zy%Ãj��\�d���+�V�J�>�����V�l_�B3~9�uN�Y}�W�nW	�c��.|a%[�u���y�a��7�r���N��#M�G@B>Z���Q/P�8"I�Ju���ĵzt>\Uh���ޅ�����s�]�R'�]Pղ�xQE~O���~/d����$�����)4��ءXU�����z���uMݹT�K9F�8҃�kUô�qTH�����f�l�	Y��f�n=�{Z))�qH��i�]R������8]g���H��Z�#�ғ���9y�S‵��=�F��P�S��ś���x
o[�������:�^��wpY'���BOӇ�Jb)�����5��e/m	�1sWmf�J�PU��	9��E]���SqH����J�\�L��U�;��^�7u<E��I��JӗV%��L�T��-�@v�7I'~�y�@/R�L0-<�~W�Y���<�n�sլZ�=�E��q5~y�q�ړE�\�1�T7��l��[���Y��Z0(���ԪV��3ū����v{"��=��9��Q=��!2�aU�y#��B���|�������Vw!G�5��L�K��P�u�W�ݺa���i{��V>��xu���d�|�2�/.�)���6�V]�-k��a�g�|ҭ0ŷ���0�nB������D���j�ɞ�[�-UG��x��W.����Ebɒ]<]�G�1mam��;�Zݶ[A��Õ3�'�X��3#�6)x=����J�j���n��|{=���NWLc���Vx����S�ӵa�&En�;%,�:w"i_|!w��1�H����(��?�>��oS�$������.�-oDj�\둕S�ڣD��N��rk���@�t�B}W���y�^d-�oV��׌r�6�s)c�8�����]d%����sl�-�ɂ�2���+�����|L7��8}{�Kp�L���_N�O����ĕ��h��<�G�d����U��k�W�v���kn�Bا�������(            x������ � �         a  x�M�=�A��S���j�_�@"�1!Iٮڙ�^�v���ab�v�AܣoB-$�X�����L��WZ����������B���v�{�t���	rZ�Q��2��Rb-]�L��z�o��_���U��p1n� 밪�Ȉ�ЪO^{omz�����=�>̟߯�KM(&�#�G`�
5>�ΉC�J��u{s9����s�����)��a�⣨N�����l��� <n��������k=ԪȐ;�wH�	#4�h&J������T_k�1u���\��.	�y����\��z;��zp��;D�G�:�(����L/��{�r��Ab`+�!s������v�7���gι����            x������ � �         e  x��Wˎܸ]W?�Y�[dm��|\��֣"���Y�EAF�U2�8A8#��ʽ,����K�Rm��Y��fI�p�=�\��S����iKU
�z�reZZH��.�=��)�G2�)�q�c���H��8��y�{���:���{��s_���n�v��Lh��0q����^K!�؁�>+���S����iZ��I��bL7&i/e�[�i�j���M�r2�$ �(w���t*yI�|!�0�U��_H��m!�����<�|_:�{$ ��4O���p������6�88�K�P�V^HI�󜦦MQh$�;OFГ��&K��G�O���|�H�H����i@xaO��-ɟ�����>��e�a,/������G�̣��U���i��6���@�<K�����w\%�
��ՃO0��D�yH���
�,0�錫Rr9'����紐�iF��iJhO?���\nW�_*��Bu�M����{g��z�`�1��7HTEO�-~H���cZ����eH�~�FT���
y�xݓ��G 㹲&SK�W�G4#���re��S�l�t{�Y��6{n��+����Kk$�`R��V���B�c�=F�^H7P�3&(���u�k�oD�^=b?����4ÂN����ܻ�4�m�V6�j@!����ml��&�b9�g<��}���	�z�A�p�3ܮ߇	����/ѣt��D?�*�A����ۄI�QZp*���&��o���D�����y�c{��^��+��K�����%Nя>��5��tc�(����a�gX���[k%6"?o�}�2�aS{P�g����2
�w4�Q�uӤ���k-y�eLÈ�<AMv�3������;V ���>��K�=�u�]}�v̥�'�H=�26�M��D��L��N��*�� %F��zc�r�=c���i�!A�(SE_i=b�@�n=�"��Zry (t��+�������}��w[%/�����/]�Z�X�j$�	��<��� ��-�D0l(��c��W��6�����fRRT���6A����D��M�>��I��;�\>����ӛ��o$����L�����_�O?f|�����1��\�Fr���!�O���cU�����9^~�ݷ��&��bGt8%,5ڴx�	G��x�I�&0�D�����yCjU���k(X/��n�������DO��/�oWy�O�"	X���z����e��Mx;�|y����o�&�	��5Wڊm,Z�6Q�;h@�Uc�NR76	� �ƗҾ��+d��4��Wؗ>����6� dP����
|z�*�r}~K���?���� ����"��%WN덂DcvO*��hN�n�6) ã�Qh�_�G��5���ھb������j�2z=��i�����(��×-�O�/V����~��G��NJ��`L��u��8��5��S�p+��O�e{��S��A�=��	�3FI�n�8��}�ֶ-MB{�\ ����<+�`p���jt>
�QM��}� 6@�uLi�k*)h�_��8�ڶ"hP���E����{!�d|ct�u`��`c��L��ϑd�W���6@�)pα�lC������7��X!         ~  x��W݋���'ok���F�}0���RlJc�R�p%]�.+]��1�yK	ŔRj��R\î����N���<�A��?&I�JcϮ�@��\�{��}�s������n�����<!��8�����d�ˁt�A���IEe�^�HOc�^�O������r�zN��z�����:���t��>�Q}�)X��(�	��_/�4���x�<��\�|�%�.E���,ߣX&����(eNJ�r&�IB��ҙ�˂��}��rAeF�	��2�PE�̥.�Pe%J��¢,*��JZ%Bˬ*���I�
��d6K$��>�q�~�?�G崏��8Ϫ�Ԙ]�u��re�$?G�bNi+�*�������I��d2�Y$�Vjf������QUV�D
�J%.{�U(W�U�nKLD)F�R5�K�*��b1�&��7�y�
I�����D�S�[b�[�X��  .���Mb�� ɫ\$�(�*�*G���JB�͢��
�R�T�$iȊ�Y�0P؂����=���q}�X��@ ��.�̧c�BT%��D���ȵ,
�����H��ӿJ[G2I�}\�� �h����R��,�4�L���*�R�"XT�)���+�L�A���f{��Kv3{�007��� ��G�{�
UA;�a��$�%ق��[4e��?%Y�G��g���3���ڣ��ɴ��m����aҰ�ʦƿ�L�(e�(���L$X4d �۞�?f*Wb?V�p#?He��<Iw+��T�8�����v>�'����N�p�!7�/Y� �D�1=��ͼ,��t�/ه3nv�آ��`[���j.um��z���svϵ�1����x�������p"<��a�mO��-� ��I�r2�ǽN4�h�H�7�'�狾�ˉcO|�'zQ8�Cٹs���@��ص��qlo0pm1Ev4��p��a��C��v�"�d���B��;To���_u{�K=�\�X��6���o�3�.���:���������2������0�=�N�;�l�����9=7�\�큒�0�ra᎙�����W@�.."f�Z�g��W�^b���SX������x���ؽ������ك3��i@�����CEi�D���֫GWY	BU?�ӏ���Rdt�^�d�}
�%H��|��@�A�6j|���؎# �O_�^����}9���n��1`X`� (?�e�<��r�e0WG�r����S�e&��`�K�4��4��o����5�����K�����^�ԴW?� ����k�1��V�Mj��!L�}�>5'L,`�g��/P)m���V��2�O��a$�#Y���)�f��c�=L+�F��`��v1+��׳�|d�ES���y���}�ۥ?l�b�Ɋ��t����a�oe�kn�3犏�)r��� ���%�^�?}�517�MP�z�4�kY����Դ���G%���w���S����&���^"���&>(ɯ��A_���?���̙�a 礱�������?C��s�M� [���Q����>��o%j<f|�����$��}�n��$f~q�6B���O<���.6�¶`��%xĳ��s��D�f��E�6�(Z6ӓ{sj(��^��*ב�5�j�c���ɹMT�ރX�j��K�2�6�dF�V��T�޶�vrA����i;�]�7���{�������������~�T|��az>Uf0m�yo���PV�t�=<;�gڂMw9�������r���m��C�f�z��m��C�������=xj��	��eW{��>��cm�]�Y
�S�9u��ܗ(*��v�4�M�x���	������N͖k�R�Wmǵ��WǦ�&b<I����ޘ[����{��-x�s��)w���M���7���SD�LW69xP�|�s.��VY��l,s��:�0���Y��G���j!�u{	_���@�ߛ�f
lj����͇�5��/�f`����ť�u���ǟaе��>�A�i����ǜy/A7�˺4ۦ�v#�Y�W��Kx�=�7���#��B�[�jw[�Y�j㮽8xWќItzh��c������Mv���9�ɰӋ��x��n_���L|{���'���F"�8����ӷ����B�p�a��r8�&���<�}#�ӽr���Z?�         6  x�����$0D�\�		��:|���XG�zt7�7Ϲ�3��T�!�2=�k���ةg7���p�>����ҿu��� 5"��HC�3"?��,�A��A	7Tl����tl�	l�_M�.ɯ��F�;~#��;]Ƌԉ���$�r�J���Y�Y�a���mб|�h�|䇄��&��nN�	~�!t9N��+�H1r��ʌ_�\�>��D8N�=�gra:�%�Õ�A0m���Uo$)�-7���$`�ZLj^���tv�V�#(0�Y�Bz����o��f�izi�驙o�^���������H         �  x��W͎�5<�<�jθ��?��U�C�����Sb��	-�>M�x��\.Ws��F���pm��-bﳋv�}>�<Ky�ҔJ��
�5y��DX�Ƿ���:�jZɨFCV���CW����+r+s���$;�^�"S֔�m���)���B���ܲ�y+k!�3W�eז�J^m�8�6�vp�a6V����$�O�q�.��ֱc�~�صw�!T�$�nH5g���g=���b�T��b�a+i�K /������?��������<=K-m�����+��8�Y'gT[���ʶL����M���Ǉ���~�(�����19l�nu*H!�elG�ʧT?����a��S�7)oM������f��D�ID7�(��u�ي� ����ZaE����|��B:�
�Y��B}a����c�/��c(�L|�'��\�%�X���`�\��yA65�1�Zg�5be��!� 
9���|��7k���q��,��E%(o�"��~đPn	e4C ���Pi��O`�M[�^@����{IvE'�ej9c�QNy(��|�W��F鍆�5�l��(Ά  �����q��j�^Gk����p�&Z��)wԫ.ݶ;t�=�G�U*��б�K��e�<�_�����R%h��	�̈��w��|*�����R�>����}|�:��K��8C���1d�rw6�#ӿP��3�o��߀�#����pK��̸�^3�Wy�^XB�J�<�q���{e^uoub� /�	��
�Y�`��b����a��w�ݮr��#��m�-~�G��V>���D�ܸ(�UWo�	����QD	��}�DR�V��胲C4F��%��_���
�������ݤ����bj�-5`U�����i���?�k2����]�I�-�m[ss���L�:��*��U�����_��ҏwX�/���i��?���y��1��4@%�fSg>�ƒ��&�3�N�#H��	��z��\v���<�K������,�ƚ%aN�\ c��Vc`\�3��C`���U�wo�&����4�0|3a��N2�P� w�0\������Q`^f^��y��u��C3����p�n��P�?�k[G�a�n�)�`�'.����f;[������t8)����k�ۡ�l_��///?��mU         ?  x�M�=N1�z}
_`��^��*����ʂ��cD�$B)"R
�MAa�{�Mp(P���7�5L�d����rdt�T�A4��Λ@�qx�iߎ�U7��yK�HL5\�R�l$�Ӎ��ZQs��W�����xx-�~���;:�u-���6� ���&�cN@��Fy4�U�㰻��C��Zڞ��"��J�ٿLD�5�$� �
�CLJH�jc����?k��:����@���]>�mG�i^�Z2�d�0P�A[�� �3��I+VM������֑T^��G`ʗE�I��r��3�R����$.�Ӏ�cI����� ����         �  x���َ�H���OQu;�W��N^���R)���1^���hޡߦ�d�5ө�ti��-!s������h
�<P4E���D�#4��	&�����͎���w��(�
�����:w0������!������:������%)�'��6g�a:��Z���Z�&A?L�th�:�UZŔ��Ŭ�a�0��*�!ZԳ�D>h]יs;�թAm�^:�&7wiUn�85ܺ�|gg���z��uӑ9<�+�n��v�%Ngs�;���-���l/l\o�x�W@on9�Z�P9��}].���{+�`r�+��)/͙���i!����/�`�B4#]����,���#+AMщΔ�BJy@j�Vu�Eu�����J�?�W�Zz�9F^t���+��Nj䘴�-g��nu����	j��9EՊ����X��`�@�b�@3�1�<D�cY$T�!`��� ��'p&&0Q�Ωb�"P���ڣ$_�>���+��T���j'�_+W��Ё[[�+�i�~�r�5в��Ж��wQ�E�� 3DHj��b�0�H����P��
J�' DcH���-���*!�(�  C�y)�~zT�>����Y��6勓s����97S>�̏�IU,��>M/�T�WB���U;K�&��fdjۛW�K�f�7��,��K��dև8��y֏! v6vgN��I2�C����:I���M�@ŭ���Ќ�]�|�@�� �BT� �I &��b��)$��\^y1 �(xPӈ0��K��"a�u]`�%�N���⋗�"������ŗ�"��j����ֿ,υ���j��"�=�T͊���X�۳�9].&(�YRNQ��3��jb�?��	n��4�#J�n�z��O���9��l�ڳ��	��y�4�gDa���wwF�` 6�3Ŏ�Q��E��t�����m��W{��|rGZ�E�Ȁ�k	�B�C�,��P.�dC���� b�C�0��0k��h�]� �~���o��X��2=x'�{s��n:�\���`\��aM*C�a�
1$$���4����B�Yh�!��̔i�ܔʚúD�]4����F���?U�ծ�ۂ�\�V�,H�8ۥK�t�VSjO���������M�K�V����r`���2�H6Û���ҚM�v�`{y��ƶ�[��́�id��&�8`S������3�H�sK)z~�x5�ݰFZ?X���a�z�$�� �c�
5��_�D'� G
%LzBT��b#�3�@���\ �яB�� r��lϗ�7w������F=�e�B<g�xRꦱ3��:���U߳CU� ̠-(?�  	-��S4q��0��xbZ�Q�1�(�
(����0(�"`q�$��ύ֣�i�s2�K�Tǒ�M��E�O�ڝ	&�^�=;���]��{�V�����^0P����_l���$��X늄s�p�6iD$�0�L�v�K?z�3gD0��c��z�o�k���۸�o�O�&_�񊗣^�'h�����-����ZN�,O���&@�OFw�����ٽ_��	X߉��������Y��s�DN�w"�p���{�[���.ɚe��,&�)�v&����F�m�4��FA�g� ����7�����93x�     