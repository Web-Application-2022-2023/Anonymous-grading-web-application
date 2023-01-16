# Anonymous-grading-web-application
# Membrii echipei:
Gălbinașu Ana-Teodora - 1084 C

Ghiță Tiberiu-Andrei - 1084 C

Glăvan Ioana-Rucsandra - 1084 C

# Descriere aplicație:
Aplicația permite acordarea de punctaje anonime de către un juriu anonim de studenți proiectului altor studenți. Pentru a putea accesa aplicația, studentul/profesorul trebuie să își creeze un cont, iar pe baza acestuia are acces la funcționalitățile de mai jos.

# Funcționalități:
  - creare cont utilizator (student/profesor) pe baza unor câmpuri sau cu ajutorul unui API. Acțiuni posibile:
  
      - modificare cont 
     
      - ștergere cont
     
      - resetare parolă
     
  - utilizatorul student poate adăuga un proiect și poate să defineasca o serie de livrabile parțiale (etapă necesară pentru inscrierea la grupul posibil de evaluatori) 
  Mențiune: studentul nu își poate evalua prorpiul proiect
  - pentru un livrabil se poate adăuga un video demonstrativ pentru proiect sau un link la un server unde poate fi accesat proiectul
  - la data unui livrabil, se selectează aleatoriu un grup de studenți care să facă parte din juriul proiectului (acordare notei se face doar de către studenții care au fost aleși să jurizeze)
  - nota proiectului este anonimă 
  - nota finală se calculează omițând cea mai mare și cea mai mică notă (notele sunt de la 1 la 10 cu până la două cifre fracționare)
  - utilizatorul profesor poate vedea evaluarea pentru fiecare proiect fără a avea acces la identitatea membrilor juriului
  - aplicația conține un sistem de permisiuni: doar un membru al juriului poate să modifice/adauge note, dar doar pentru o perioadă limitată de timp


# Tehnologii:
  - Front-end: React.js
  - Back-end: Node.js + interfașă REST
  - Stocare: SQLite3 
	

