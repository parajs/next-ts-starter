import { RightOutlined } from '@ant-design/icons';

export const ExternalLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <a
      href={href}
      className="inline-flex gap-x-2 rounded-lg bg-gray-700 px-3 py-1 text-sm font-medium text-gray-100 no-underline hover:bg-gray-500 hover:text-white"
    >
      <div>{children}</div>

      <RightOutlined />
    </a>
  );
};