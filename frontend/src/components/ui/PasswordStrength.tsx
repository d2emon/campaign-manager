const passwordStrengthText = {
  0: 'Слабый',
  1: 'Средний',
  2: 'Сильный',
  3: 'Очень сильный',
}

const PasswordStrength = (props: { password: string }) => {
  const { password } = props;

  const getPasswordStrength = (value: string) => {
    if (!value) return 0;
    if (value.length < 6) return 1;
    if (/[A-Z]/.test(value) && /[0-9]/.test(value)) return 3;
    return 2;
  };

  const strength = getPasswordStrength(password);
  const strengthClass = strength >= 3 ? 'bg-green-500' : 'bg-yellow-500';
  const strengthText = passwordStrengthText[strength] || 'Слабый';

  return (
    <div>
      <div className="text-gray-600">
        Сложность пароля:
        {' '}
        <span className="font-bold">{strengthText}</span>
      </div>
      <div className="flex gap-1 h-1">
        {[1, 2, 3].map((level) => (
          <div
            key={level}
            className={`flex-1 rounded ${strength >= level ? strengthClass : 'bg-gray-200'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PasswordStrength;
