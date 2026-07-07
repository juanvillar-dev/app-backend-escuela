-- =====================
-- ÁREAS PRINCIPALES
-- =====================
INSERT INTO Area (id, nombre) VALUES
(1, 'Matemáticas'),
(2, 'Comunicación'),
(3, 'Ciencias Naturales'),
(4, 'Ciencias Sociales'),
(5, 'Arte'),
(6, 'Educación Física'),
(7, 'Tecnología'),
(8, 'Idiomas'),
(9, 'Religión'),
(10, 'Ciudadanía');






-- =====================
-- MATERIAS RELACIONADAS A CADA ÁREA
-- =====================

-- Matemáticas (areaId = 1)
INSERT INTO Materia (id, nombre, areaId) VALUES
(1, 'Aritmética', 1),
(2, 'Álgebra', 1),
(3, 'Geometría', 1),
(4, 'Trigonometría', 1),
(5, 'Estadística', 1);

-- Comunicación (areaId = 2)
INSERT INTO Materia (id, nombre, areaId) VALUES
(6, 'Lengua y Literatura', 2),
(7, 'Redacción', 2),
(8, 'Comprensión Lectora', 2),
(9, 'Oratoria', 2);

-- Ciencias Naturales (areaId = 3)
INSERT INTO Materia (id, nombre, areaId) VALUES
(10, 'Biología', 3),
(11, 'Química', 3),
(12, 'Física', 3),
(13, 'Ciencias Ambientales', 3);

-- Ciencias Sociales (areaId = 4)
INSERT INTO Materia (id, nombre, areaId) VALUES
(14, 'Historia', 4),
(15, 'Geografía', 4),
(16, 'Economía', 4),
(17, 'Filosofía', 4);

-- Arte (areaId = 5)
INSERT INTO Materia (id, nombre, areaId) VALUES
(18, 'Música', 5),
(19, 'Artes Plásticas', 5),
(20, 'Teatro', 5),
(21, 'Danza', 5);

-- Educación Física (areaId = 6)
INSERT INTO Materia (id, nombre, areaId) VALUES
(22, 'Deportes', 6),
(23, 'Gimnasia', 6),
(24, 'Atletismo', 6);

-- Tecnología (areaId = 7)
INSERT INTO Materia (id, nombre, areaId) VALUES
(25, 'Informática', 7),
(26, 'Robótica', 7),
(27, 'Programación', 7),
(28, 'Electrónica', 7);

-- Idiomas (areaId = 8)
INSERT INTO Materia (id, nombre, areaId) VALUES
(29, 'Inglés', 8),
(30, 'Francés', 8),
(31, 'Portugués', 8),
(32, 'Quechua', 8);

-- Religión (areaId = 9)
INSERT INTO Materia (id, nombre, areaId) VALUES
(33, 'Religión Católica', 9),
(34, 'Ética y Valores', 9);

-- Ciudadanía (areaId = 10)
INSERT INTO Materia (id, nombre, areaId) VALUES
(35, 'Educación Cívica', 10),
(36, 'Constitución y Derechos Humanos', 10),
(37, 'Formación Ciudadana', 10);
















-- =====================
-- GRADOS
-- =====================
INSERT INTO Grado (id, nivel, year) VALUES
-- Inicial
(1, 'inicial', 4),
(2, 'inicial', 5),

-- Primaria
(3, 'primaria', 6),
(4, 'primaria', 7),
(5, 'primaria', 8),
(6, 'primaria', 9),
(7, 'primaria', 10),
(8, 'primaria', 11),

-- Secundaria
(9, 'secundaria', 12),
(10, 'secundaria', 13),
(11, 'secundaria', 14),
(12, 'secundaria', 15),
(13, 'secundaria', 16);



-- =====================
-- ASOCIACIÓN GRADO-MATERIA
-- =====================

-- Inicial (4 y 5 años)
INSERT INTO GradoMateria (gradoId, materiaId) VALUES
(1, 1), -- Aritmética básica
(1, 6), -- Lengua y Literatura
(1, 18), -- Música
(1, 22), -- Deportes
(2, 1),
(2, 6),
(2, 19), -- Artes Plásticas
(2, 23); -- Gimnasia

-- Primaria (6 a 11 años)
INSERT INTO GradoMateria (gradoId, materiaId) VALUES
(3, 1), (3, 6), (3, 14), (3, 18), (3, 22),
(4, 2), (4, 7), (4, 15), (4, 19), (4, 23),
(5, 3), (5, 8), (5, 10), (5, 20), (5, 24),
(6, 4), (6, 9), (6, 11), (6, 21), (6, 29),
(7, 5), (7, 12), (7, 16), (7, 30), (7, 25),
(8, 5), (8, 13), (8, 17), (8, 31), (8, 26);

-- Secundaria (12 a 16 años)
INSERT INTO GradoMateria (gradoId, materiaId) VALUES
(9, 2), (9, 6), (9, 10), (9, 14), (9, 29),
(10, 3), (10, 7), (10, 11), (10, 15), (10, 30),
(11, 4), (11, 8), (11, 12), (11, 16), (11, 31),
(12, 5), (12, 9), (12, 13), (12, 17), (12, 25),
(13, 5), (13, 9), (13, 13), (13, 17), (13, 27), (13, 33), (13, 36);














-- =====================
-- USUARIOS (Alumnos con DNIs aleatorios)
-- =====================
INSERT INTO Usuario (dni, nombre, apellido, email, passwordHash, rol, genero) VALUES
('72839104', 'Carlos', 'Ramírez', 'carlos.ramirez@correo.com', 'hash001', 'Alumno', 'M'),
('84572039', 'Lucía', 'Fernández', 'lucia.fernandez@correo.com', 'hash002', 'Alumno', 'F'),
('73928451', 'José', 'Pérez', 'jose.perez@correo.com', 'hash003', 'Alumno', 'M'),
('81293745', 'María', 'Gómez', 'maria.gomez@correo.com', 'hash004', 'Alumno', 'F'),
('76583920', 'Andrés', 'Torres', 'andres.torres@correo.com', 'hash005', 'Alumno', 'M'),
('89457213', 'Paola', 'Castro', 'paola.castro@correo.com', 'hash006', 'Alumno', 'F'),
('70391824', 'Miguel', 'Vargas', 'miguel.vargas@correo.com', 'hash007', 'Alumno', 'M'),
('82910457', 'Sofía', 'Rojas', 'sofia.rojas@correo.com', 'hash008', 'Alumno', 'F'),
('74829103', 'Diego', 'Martínez', 'diego.martinez@correo.com', 'hash009', 'Alumno', 'M'),
('89237410', 'Valeria', 'López', 'valeria.lopez@correo.com', 'hash010', 'Alumno', 'F'),
('71928364', 'Javier', 'Mendoza', 'javier.mendoza@correo.com', 'hash011', 'Alumno', 'M'),
('83572910', 'Camila', 'Reyes', 'camila.reyes@correo.com', 'hash012', 'Alumno', 'F'),
('76482901', 'Sebastián', 'Morales', 'sebastian.morales@correo.com', 'hash013', 'Alumno', 'M'),
('80391725', 'Daniela', 'Salazar', 'daniela.salazar@correo.com', 'hash014', 'Alumno', 'F'),
('75281930', 'Alejandro', 'Flores', 'alejandro.flores@correo.com', 'hash015', 'Alumno', 'M'),
('81920374', 'Natalia', 'Cruz', 'natalia.cruz@correo.com', 'hash016', 'Alumno', 'F'),
('74829175', 'Gabriel', 'Silva', 'gabriel.silva@correo.com', 'hash017', 'Alumno', 'M'),
('89371025', 'Carolina', 'Ramos', 'carolina.ramos@correo.com', 'hash018', 'Alumno', 'F'),
('70291836', 'Luis', 'Navarro', 'luis.navarro@correo.com', 'hash019', 'Alumno', 'M'),
('81293764', 'Andrea', 'Paredes', 'andrea.paredes@correo.com', 'hash020', 'Alumno', 'F'),
('73829105', 'Felipe', 'Ortega', 'felipe.ortega@correo.com', 'hash021', 'Alumno', 'M'),
('81293047', 'Isabella', 'Suárez', 'isabella.suarez@correo.com', 'hash022', 'Alumno', 'F'),
('75928364', 'Martín', 'Delgado', 'martin.delgado@correo.com', 'hash023', 'Alumno', 'M'),
('89371029', 'Renata', 'Campos', 'renata.campos@correo.com', 'hash024', 'Alumno', 'F'),
('70481923', 'Tomás', 'Aguilar', 'tomas.aguilar@correo.com', 'hash025', 'Alumno', 'M'),
('84572901', 'Florencia', 'Mejía', 'florencia.mejia@correo.com', 'hash026', 'Alumno', 'F'),
('73918264', 'Hugo', 'Santos', 'hugo.santos@correo.com', 'hash027', 'Alumno', 'M'),
('81293756', 'Valentina', 'Herrera', 'valentina.herrera@correo.com', 'hash028', 'Alumno', 'F'),
('76582913', 'Rodrigo', 'Ponce', 'rodrigo.ponce@correo.com', 'hash029', 'Alumno', 'M'),
('82910374', 'Mónica', 'Vega', 'monica.vega@correo.com', 'hash030', 'Alumno', 'F'),
('74829165', 'Esteban', 'Cornejo', 'esteban.cornejo@correo.com', 'hash031', 'Alumno', 'M'),
('89237419', 'Gabriela', 'Quispe', 'gabriela.quispe@correo.com', 'hash032', 'Alumno', 'F'),
('71928375', 'Álvaro', 'Palacios', 'alvaro.palacios@correo.com', 'hash033', 'Alumno', 'M'),
('83572964', 'Julieta', 'Montoya', 'julieta.montoya@correo.com', 'hash034', 'Alumno', 'F'),
('76482937', 'Ignacio', 'Bravo', 'ignacio.bravo@correo.com', 'hash035', 'Alumno', 'M'),
('80391746', 'Rocío', 'Villanueva', 'rocio.villanueva@correo.com', 'hash036', 'Alumno', 'F'),
('75281947', 'Mauricio', 'Serrano', 'mauricio.serrano@correo.com', 'hash037', 'Alumno', 'M'),
('81920385', 'Elena', 'Fuentes', 'elena.fuentes@correo.com', 'hash038', 'Alumno', 'F'),
('74829192', 'Cristian', 'Peña', 'cristian.pena@correo.com', 'hash039', 'Alumno', 'M'),
('89371038', 'Patricia', 'Carrillo', 'patricia.carrillo@correo.com', 'hash040', 'Alumno', 'F'),
('73918205', 'Matías', 'Huamán', 'matias.huaman@correo.com', 'hash041', 'Alumno', 'M'),
('81293058', 'Alejandra', 'Quispe', 'alejandra.quispe@correo.com', 'hash042', 'Alumno', 'F'),
('75928372', 'Samuel', 'Rivas', 'samuel.rivas@correo.com', 'hash043', 'Alumno', 'M'),
('89371041', 'Marisol', 'Cárdenas', 'marisol.cardenas@correo.com', 'hash044', 'Alumno', 'F'),
('70481939', 'Pedro', 'Villalobos', 'pedro.villalobos@correo.com', 'hash045', 'Alumno', 'M'),
('84572918', 'Claudia', 'Espinoza', 'claudia.espinoza@correo.com', 'hash046', 'Alumno', 'F'),
('73918277', 'Ángel', 'Soria', 'angel.soria@correo.com', 'hash047', 'Alumno', 'M'),
('81293769', 'Fiorella', 'Matos', 'fiorella.matos@correo.com', 'hash048', 'Alumno', 'F'),
('76582927', 'Ricardo', 'Salinas', 'ricardo.salinas@correo.com', 'hash049', 'Alumno', 'M'),
('82910385', 'Marina', 'Del Carpio', 'marina.delcarpio@correo.com', 'hash050', 'Alumno', 'F'),
('74829178', 'Cristóbal', 'Paredes', 'cristobal.paredes@correo.com', 'hash051', 'Alumno', 'M'),
('89237427', 'Teresa', 'Gutiérrez', 'teresa.gutierrez@correo.com', 'hash052', 'Alumno', 'F'),
('71928388', 'Oscar', 'Valdivia', 'oscar.valdivia@correo.com', 'hash053', 'Alumno', 'M'),
('83572973', 'Milagros', 'Chávez', 'milagros.chavez@correo.com', 'hash054', 'Alumno', 'F'),
('76482945', 'Pablo', 'Rosales', 'pablo.rosales@correo.com', 'hash055', 'Alumno', 'M'),
('80391758', 'Verónica', 'Mendoza', 'veronica.mendoza@correo.com', 'hash056', 'Alumno', 'F'),
('75281954', 'Héctor', 'Ramírez', 'hector.ramirez@correo.com', 'hash057', 'Alumno', 'M'),
('81920394', 'Cecilia', 'Morales', 'cecilia.morales@correo.com', 'hash058', 'Alumno', 'F'),
('74829203', 'Raúl', 'Sánchez', 'raul.sanchez@correo.com', 'hash059', 'Alumno', 'M'),
('89371049', 'Lorena', 'Alarcón', 'lorena.alarcon@correo.com', 'hash060', 'Alumno', 'F');


-- =====================
-- ALUMNOS (relación con Usuario y Grado)
-- =====================
INSERT INTO Alumno (id, fechaNacimiento, usuarioId, gradoId) VALUES
(1, '2018-03-15', 1, 1),
(2, '2017-07-22', 2, 2),
(3, '2016-05-10', 3, 3),
(4, '2015-11-30', 4, 4),
(5, '2014-01-25', 5, 5),
(6, '2013-09-12', 6, 6),
(7, '2012-04-18', 7, 7),
(8, '2011-06-05', 8, 8),
(9, '2010-08-20', 9, 9),
(10, '2009-12-01', 10, 10),
(11, '2008-02-14', 11, 11),
(12, '2007-10-09', 12, 12),
(13, '2006-07-27', 13, 13),
(14, '2016-09-03', 14, 3),
(15, '2015-04-21', 15, 4),
(16, '2014-12-17', 16, 5),
(17, '2013-08-29', 17, 6),
(18, '2012-03-11', 18, 7),
(19, '2011-05-06', 19, 8),
(20, '2010-10-25', 20, 9),

(21, '2018-04-12', 21, 1),
(22, '2017-09-08', 22, 2),
(23, '2016-06-19', 23, 3),
(24, '2015-12-25', 24, 4),
(25, '2014-02-14', 25, 5),
(26, '2013-10-03', 26, 6),
(27, '2012-05-27', 27, 7),
(28, '2011-07-15', 28, 8),
(29, '2010-09-21', 29, 9),
(30, '2009-11-30', 30, 10),
(31, '2008-01-18', 31, 11),
(32, '2007-08-07', 32, 12),
(33, '2006-03-29', 33, 13),
(34, '2016-10-02', 34, 3),
(35, '2015-05-11', 35, 4),
(36, '2014-11-23', 36, 5),
(37, '2013-07-30', 37, 6),
(38, '2012-02-09', 38, 7),
(39, '2011-06-18', 39, 8),
(40, '2010-12-05', 40, 9),

(41, '2018-05-10', 41, 1),
(42, '2017-08-22', 42, 2),
(43, '2016-06-14', 43, 3),
(44, '2015-12-09', 44, 4),
(45, '2014-03-27', 45, 5),
(46, '2013-09-18', 46, 6),
(47, '2012-04-25', 47, 7),
(48, '2011-07-30', 48, 8),
(49, '2010-09-12', 49, 9),
(50, '2009-11-05', 50, 10),
(51, '2008-02-21', 51, 11),
(52, '2007-10-14', 52, 12),
(53, '2006-07-03', 53, 13),
(54, '2016-09-19', 54, 3),
(55, '2015-05-28', 55, 4),
(56, '2014-12-11', 56, 5),
(57, '2013-08-07', 57, 6),
(58, '2012-03-23', 58, 7),
(59, '2011-06-16', 59, 8),
(60, '2010-10-29', 60, 9);



















-- =====================
-- USUARIOS (Docentes con DNIs aleatorios)
-- =====================
INSERT INTO Usuario (dni, nombre, apellido, email, passwordHash, rol, genero) VALUES
('72839177', 'Juan', 'Castillo', 'juan.castillo1@correo.com', 'hash201', 'Docente', 'M'),
('84572088', 'Rosa', 'García', 'rosa.garcia2@correo.com', 'hash202', 'Docente', 'F'),
('73928492', 'Pedro', 'Luna', 'pedro.luna3@correo.com', 'hash203', 'Docente', 'M'),
('81293782', 'Marta', 'Salas', 'marta.salas4@correo.com', 'hash204', 'Docente', 'F'),
('76583955', 'Carlos', 'Huerta', 'carlos.huerta5@correo.com', 'hash205', 'Docente', 'M'),
('89457244', 'Elena', 'Moreno', 'elena.moreno6@correo.com', 'hash206', 'Docente', 'F'),
('70391867', 'Luis', 'Paredes', 'luis.paredes7@correo.com', 'hash207', 'Docente', 'M'),
('82910489', 'Patricia', 'Torres', 'patricia.torres8@correo.com', 'hash208', 'Docente', 'F'),
('74829144', 'Ricardo', 'Soto', 'ricardo.soto9@correo.com', 'hash209', 'Docente', 'M'),
('89237455', 'María', 'Flores', 'maria.flores10@correo.com', 'hash210', 'Docente', 'F'),
('71928399', 'Fernando', 'Rojas', 'fernando.rojas11@correo.com', 'hash211', 'Docente', 'M'),
('83572982', 'Claudia', 'Vargas', 'claudia.vargas12@correo.com', 'hash212', 'Docente', 'F'),
('76482953', 'Jorge', 'Ramírez', 'jorge.ramirez13@correo.com', 'hash213', 'Docente', 'M'),
('80391769', 'Silvia', 'Cruz', 'silvia.cruz14@correo.com', 'hash214', 'Docente', 'F'),
('75281961', 'Hernán', 'Mendoza', 'hernan.mendoza15@correo.com', 'hash215', 'Docente', 'M'),
('81920402', 'Paola', 'Reyes', 'paola.reyes16@correo.com', 'hash216', 'Docente', 'F'),
('74829211', 'Gustavo', 'Salazar', 'gustavo.salazar17@correo.com', 'hash217', 'Docente', 'M'),
('89371057', 'Natalia', 'Fernández', 'natalia.fernandez18@correo.com', 'hash218', 'Docente', 'F'),
('70481948', 'Óscar', 'Morales', 'oscar.morales19@correo.com', 'hash219', 'Docente', 'M'),
('84572926', 'Verónica', 'Chávez', 'veronica.chavez20@correo.com', 'hash220', 'Docente', 'F');

-- =====================
-- DOCENTES (relación con Usuario)
-- =====================
-- Aquí usamos SELECT para obtener los IDs generados automáticamente de Usuario
-- y asignarlos a Docente con su especialidad.
INSERT INTO Docente (usuarioId, especialidad) VALUES
((SELECT id FROM Usuario WHERE email='juan.castillo1@correo.com'), 'Matemáticas'),
((SELECT id FROM Usuario WHERE email='rosa.garcia2@correo.com'), 'Comunicación'),
((SELECT id FROM Usuario WHERE email='pedro.luna3@correo.com'), 'Historia'),
((SELECT id FROM Usuario WHERE email='marta.salas4@correo.com'), 'Biología'),
((SELECT id FROM Usuario WHERE email='carlos.huerta5@correo.com'), 'Física'),
((SELECT id FROM Usuario WHERE email='elena.moreno6@correo.com'), 'Química'),
((SELECT id FROM Usuario WHERE email='luis.paredes7@correo.com'), 'Inglés'),
((SELECT id FROM Usuario WHERE email='patricia.torres8@correo.com'), 'Arte'),
((SELECT id FROM Usuario WHERE email='ricardo.soto9@correo.com'), 'Educación Física'),
((SELECT id FROM Usuario WHERE email='maria.flores10@correo.com'), 'Programación'),
((SELECT id FROM Usuario WHERE email='fernando.rojas11@correo.com'), 'Geografía'),
((SELECT id FROM Usuario WHERE email='claudia.vargas12@correo.com'), 'Lengua y Literatura'),
((SELECT id FROM Usuario WHERE email='jorge.ramirez13@correo.com'), 'Economía'),
((SELECT id FROM Usuario WHERE email='silvia.cruz14@correo.com'), 'Filosofía'),
((SELECT id FROM Usuario WHERE email='hernan.mendoza15@correo.com'), 'Química'),
((SELECT id FROM Usuario WHERE email='paola.reyes16@correo.com'), 'Biología'),
((SELECT id FROM Usuario WHERE email='gustavo.salazar17@correo.com'), 'Matemáticas'),
((SELECT id FROM Usuario WHERE email='natalia.fernandez18@correo.com'), 'Historia'),
((SELECT id FROM Usuario WHERE email='oscar.morales19@correo.com'), 'Inglés'),
((SELECT id FROM Usuario WHERE email='veronica.chavez20@correo.com'), 'Arte');
