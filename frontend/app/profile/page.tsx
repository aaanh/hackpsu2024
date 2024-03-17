export default function ProfilePage() {
  const user = useUser();
  return user.isStudent ? <StudentProfile /> : <TeacherProfile />;
}
